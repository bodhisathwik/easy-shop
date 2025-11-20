import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { purchases, allProducts } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create a summary of past purchases
    const purchaseSummary = purchases.map((booking: any) => ({
      items: booking.items.map((item: any) => ({
        name: item.productName,
        category: allProducts.find((p: any) => p.id === item.productId)?.category || 'Unknown',
        price: item.price,
      })),
      total: booking.total,
      date: booking.orderDate,
    }));

    // Build the prompt for AI
    const systemPrompt = `You are a smart shopping assistant for Easy Shop. Your job is to recommend products based on a customer's purchase history.

Analyze their past purchases and recommend 3-4 products they might be interested in from the available catalog. Consider:
- Product categories they've bought before
- Price range they typically shop in
- Complementary products (e.g., if they bought fitness items, suggest related accessories)
- New categories they might enjoy based on their interests

Return ONLY product IDs as a JSON array of numbers. Example: [1, 5, 12, 8]`;

    const userPrompt = `Here is the customer's purchase history:
${JSON.stringify(purchaseSummary, null, 2)}

Available products to recommend from:
${JSON.stringify(allProducts.map((p: any) => ({ id: p.id, name: p.name, category: p.category, price: p.price })), null, 2)}

Recommend 3-4 products the customer might like. Return ONLY a JSON array of product IDs.`;

    console.log('Calling AI with purchase history...');

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get recommendations from AI");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    console.log('AI response:', aiResponse);

    // Parse the AI response to extract product IDs
    let recommendedIds: number[] = [];
    try {
      // Try to extract JSON array from the response
      const jsonMatch = aiResponse.match(/\[[\d,\s]+\]/);
      if (jsonMatch) {
        recommendedIds = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: extract numbers from the text
        const numbers = aiResponse.match(/\d+/g);
        if (numbers) {
          recommendedIds = numbers.map(Number).slice(0, 4);
        }
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      // Fallback to random recommendations if parsing fails
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      recommendedIds = shuffled.slice(0, 4).map((p: any) => p.id);
    }

    // Get the actual product objects
    const recommendedProducts = allProducts.filter((p: any) => 
      recommendedIds.includes(p.id)
    );

    console.log('Recommended products:', recommendedProducts.map((p: any) => p.name));

    return new Response(
      JSON.stringify({ recommendations: recommendedProducts }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in recommend-products function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
