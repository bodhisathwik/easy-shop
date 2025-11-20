import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { PromoBanner } from '@/components/layout/PromoBanner';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductFilters } from '@/components/product/ProductFilters';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { ProductRecommendations } from '@/components/recommendations/ProductRecommendations';
import { products } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Price range filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchQuery, category, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onCartOpen={() => setIsCartOpen(true)}
      />
      <PromoBanner />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Easy Shop
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast shipping!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <ProductFilters
              category={category}
              setCategory={setCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </aside>

          <main className="lg:col-span-3 space-y-12">
            {user && <ProductRecommendations />}

            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  {filteredProducts.length} Products Found
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No products found. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
