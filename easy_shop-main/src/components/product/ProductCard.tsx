import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover:shadow-card transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
              {product.discount}% OFF
            </Badge>
          </div>
          
          <div className="p-4 space-y-3">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-accent text-accent'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                ({product.rating})
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
