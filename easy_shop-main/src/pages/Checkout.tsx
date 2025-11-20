import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PriceBreakdown } from '@/components/cart/PriceBreakdown';
import { toast } from 'sonner';

interface BookingItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Booking {
  orderId: string;
  userId: string;
  orderDate: string;
  items: BookingItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { user, updateUserSpending } = useAuth();
  const { cartItems, clearCart, getSubtotal, getTax, getShipping, getCartTotal } = useCart();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Create booking
    const orderId = `ORD${Date.now()}`;
    const orderDate = new Date().toISOString();
    const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const booking: Booking = {
      orderId,
      userId: user.id,
      orderDate,
      items: cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal: getSubtotal(),
      tax: getTax(),
      shipping: getShipping(),
      total: getCartTotal(),
      status: 'Confirmed',
      estimatedDelivery,
    };

    // Save booking
    const bookings = JSON.parse(localStorage.getItem('easyshop_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('easyshop_bookings', JSON.stringify(bookings));

    // Update user spending
    updateUserSpending(getCartTotal());

    // Clear cart
    clearCart();

    toast.success(`Order placed successfully! Order ID: ${orderId}`);
    navigate('/dashboard?tab=history');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-center bg-gradient-primary bg-clip-text text-transparent"
        >
          Checkout
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) =>
                        setFormData({ ...formData, paymentMethod: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full bg-gradient-primary"
                    size="lg"
                  >
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div>
            <PriceBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}
