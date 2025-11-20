import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, TrendingUp, Gift, Package, ArrowLeft } from 'lucide-react';

interface Booking {
  orderId: string;
  userId: string;
  orderDate: string;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const defaultTab = searchParams.get('tab') || 'overview';

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const allBookings = JSON.parse(localStorage.getItem('easyshop_bookings') || '[]');
    const userBookings = allBookings.filter((b: Booking) => b.userId === user.id);
    setBookings(userBookings);
  }, [user, navigate]);

  if (!user) return null;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Gold':
        return 'bg-gradient-primary';
      case 'Silver':
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
      default:
        return 'bg-gradient-to-r from-amber-600 to-amber-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'Shipped':
        return 'bg-blue-500';
      case 'Processing':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Manage your account and orders</p>
        </motion.div>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Booking History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Membership</CardTitle>
                    <Award className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <Badge className={getTierColor(user.membershipTier)}>
                      {user.membershipTier}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{user.totalSpending.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
                    <Gift className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.rewardPoints}</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <Package className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{bookings.length}</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Membership Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Bronze (₹0 - ₹19,999)</Badge>
                  <span className="text-sm text-muted-foreground">Standard benefits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Silver (₹20,000 - ₹49,999)</Badge>
                  <span className="text-sm text-muted-foreground">5% extra discount</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-primary">Gold (₹50,000 - ₹99,999)</Badge>
                  <span className="text-sm text-muted-foreground">10% extra discount + priority support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">Platinum (₹100,000+)</Badge>
                  <span className="text-sm text-muted-foreground">15% extra discount + exclusive deals</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No orders yet. Start shopping to see your order history!
                </CardContent>
              </Card>
            ) : (
              bookings.map((booking, index) => (
                <motion.div
                  key={booking.orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Order #{booking.orderId}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(booking.orderDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {booking.items.map((item) => (
                          <div key={item.productId} className="flex justify-between text-sm">
                            <span>
                              {item.productName} x {item.quantity}
                            </span>
                            <span className="font-medium">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-3 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>₹{booking.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax</span>
                          <span>₹{booking.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>{booking.shipping === 0 ? 'FREE' : `₹${booking.shipping}`}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t">
                          <span>Total</span>
                          <span className="text-primary">₹{booking.total.toLocaleString()}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Estimated delivery: {new Date(booking.estimatedDelivery).toLocaleDateString('en-IN')}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
