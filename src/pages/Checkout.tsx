
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      console.log('Starting payment process...');
      
      // Check if Razorpay script is already loaded
      if (!(window as any).Razorpay) {
        console.log('Loading Razorpay script...');
        
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          initializeRazorpay();
        };
        
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          toast({
            title: "Payment Error",
            description: "Failed to load payment gateway. Please check your internet connection.",
            variant: "destructive"
          });
          setLoading(false);
        };
        
        document.body.appendChild(script);
      } else {
        console.log('Razorpay script already loaded');
        initializeRazorpay();
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const initializeRazorpay = () => {
    const totalAmount = Math.round(getTotalPrice() * 83 * 1.1 * 100); // Convert to paise
    console.log('Total amount in paise:', totalAmount);
    
    const options = {
      key: 'fq3eTeYygrQm09UX98HHwIvL', // Your Razorpay API key
      amount: totalAmount,
      currency: 'INR',
      name: 'Medical Equipment Store',
      description: 'Purchase from Medical Equipment Store',
      image: '/favicon.ico', // Add your logo here
      order_id: `order_${Date.now()}`,
      handler: function (response: any) {
        console.log('Payment successful:', response);
        toast({
          title: "Payment Successful!",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
        clearCart();
        setLoading(false);
        // You can redirect to a success page here
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
          setLoading(false);
          toast({
            title: "Payment Cancelled",
            description: "Payment was cancelled by user.",
            variant: "destructive"
          });
        }
      }
    };
    
    try {
      console.log('Creating Razorpay instance with options:', options);
      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        toast({
          title: "Payment Failed",
          description: `Error: ${response.error.description || 'Payment failed. Please try again.'}`,
          variant: "destructive"
        });
        setLoading(false);
      });
      
      console.log('Opening Razorpay checkout...');
      rzp.open();
    } catch (error) {
      console.error('Error creating Razorpay instance:', error);
      toast({
        title: "Payment Error",
        description: "Failed to open payment gateway. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const isFormValid = formData.email && formData.firstName && formData.lastName && 
                     formData.address && formData.city && formData.phone;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No items in cart</h2>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before checkout.
            </p>
            <Button asChild>
              <Link to="/shop">Go Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/cart">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <hr />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{(getTotalPrice() * 83).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>₹{(getTotalPrice() * 83 * 0.1).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{(getTotalPrice() * 83 * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePayment}
                  disabled={!isFormValid || loading}
                  className="w-full"
                  size="lg"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {loading ? 'Processing...' : 'Pay with Razorpay'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your payment information is secure and encrypted.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
