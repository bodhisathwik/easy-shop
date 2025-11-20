import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Product, products } from '@/data/products';
import { toast } from 'sonner';

export const ProductRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Get user's purchase history
        const bookings = JSON.parse(localStorage.getItem('easyshop_bookings') || '[]');
        const userBookings = bookings.filter((b: any) => b.userId === user.id);

        if (userBookings.length === 0) {
          // No purchase history, show random products
          const shuffled = [...products].sort(() => 0.5 - Math.random());
          setRecommendations(shuffled.slice(0, 4));
          setLoading(false);
          return;
        }

        // Call the AI recommendation function
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/recommend-products`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({
              purchases: userBookings,
              allProducts: products,
            }),
          }
        );

        if (response.status === 429) {
          toast.error('Too many requests. Please try again later.');
          setLoading(false);
          return;
        }

        if (response.status === 402) {
          toast.error('AI service unavailable. Please contact support.');
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to get recommendations');
        }

        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        // Fallback to random products
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setRecommendations(shuffled.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  if (!user || recommendations.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">
          {loading ? 'Loading Recommendations...' : 'Recommended For You'}
        </h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Based on your shopping history, we think you'll love these products
      </p>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[400px] bg-card rounded-lg animate-pulse"
            />
          ))
        ) : (
          recommendations.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        )}
      </div>
    </motion.section>
  );
};
