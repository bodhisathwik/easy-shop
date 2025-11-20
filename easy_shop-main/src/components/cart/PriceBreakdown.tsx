import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

export const PriceBreakdown = () => {
  const { getSubtotal, getTax, getShipping, getCartTotal } = useCart();

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = getShipping();
  const total = getCartTotal();
  const freeShippingThreshold = 10000;
  const amountToFreeShipping = freeShippingThreshold - subtotal;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="sticky top-20">
        <CardHeader>
          <CardTitle>Price Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (18% GST)</span>
              <span className="font-medium">₹{tax.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>

            {amountToFreeShipping > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-accent/10 p-3 rounded-lg"
              >
                <Badge variant="secondary" className="mb-2">
                  💰 Save on Shipping
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Add ₹{amountToFreeShipping.toLocaleString()} more to get FREE shipping!
                </p>
              </motion.div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <motion.span
                key={total}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-primary"
              >
                ₹{total.toLocaleString()}
              </motion.span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
