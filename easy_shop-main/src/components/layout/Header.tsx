import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onCartOpen: () => void;
}

export const Header = ({ onSearch, searchQuery, onCartOpen }: HeaderProps) => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-secondary font-bold text-xl">ES</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Easy Shop
              </span>
            </div>
          </Link>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-primary">Sign Up</Button>
                </Link>
              </>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartOpen}
              className="relative gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                  {totalItems}
                </Badge>
              )}
              <span className="hidden md:inline">Cart</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
