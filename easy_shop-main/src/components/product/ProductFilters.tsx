import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ProductFiltersProps {
  category: string;
  setCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

export const ProductFilters = ({
  category,
  setCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
}: ProductFiltersProps) => {
  return (
    <div className="bg-card rounded-lg p-4 space-y-6 shadow-card">
      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
            <SelectItem value="Fitness">Fitness</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={100000}
          min={0}
          step={1000}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
