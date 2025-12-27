import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, MapPin, CreditCard, Truck, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Address } from '@/services/api';

const steps = [
  { id: 1, name: 'Address', icon: MapPin },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: Truck },
];

const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '9876543210',
      street: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const { items, getCartTotal, appliedCoupon, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr?.id || addresses[0].id);
    }
  }, [addresses, selectedAddress]);

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const deliveryFee = subtotal > 999 ? 0 : 99;
  const total = getCartTotal() + deliveryFee;

  const handleAddAddress = () => {
    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, address]);
    setSelectedAddress(address.id);
    setIsAddingAddress(false);
    setNewAddress({ name: '', phone: '', street: '', city: '', state: '', pincode: '' });
    toast({ title: 'Address added successfully!' });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast({ title: 'Please select an address', variant: 'destructive' });
      return;
    }

    // Simulate order placement
    const orderId = `ORD${Date.now()}`;
    clearCart();
    navigate(`/order-success?orderId=${orderId}`);
  };

  if (!isAuthenticated) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-medium',
                    currentStep >= step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    'ml-2 text-sm font-medium hidden sm:inline',
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-12 sm:w-24 h-0.5 mx-2',
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={cn(
                          'block cursor-pointer rounded-lg border p-4 transition-colors',
                          selectedAddress === address.id
                            ? 'border-primary bg-accent/30'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value={address.id} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{address.name}</span>
                              {address.isDefault && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {address.street}, {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Phone: {address.phone}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>

                <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                          />
                        </div>
                      </div>
                      <Button onClick={handleAddAddress} className="w-full">
                        Save Address
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="flex justify-end mt-6">
                  <Button onClick={() => setCurrentStep(2)} disabled={!selectedAddress}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <label
                      className={cn(
                        'block cursor-pointer rounded-lg border p-4 transition-colors',
                        paymentMethod === 'cod' ? 'border-primary bg-accent/30' : 'border-border'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="cod" />
                        <div>
                          <span className="font-medium">Cash on Delivery</span>
                          <p className="text-sm text-muted-foreground">Pay when you receive</p>
                        </div>
                      </div>
                    </label>

                    <label
                      className={cn(
                        'block cursor-pointer rounded-lg border p-4 transition-colors',
                        paymentMethod === 'upi' ? 'border-primary bg-accent/30' : 'border-border'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="upi" />
                        <div>
                          <span className="font-medium">UPI</span>
                          <p className="text-sm text-muted-foreground">Pay using UPI apps</p>
                        </div>
                      </div>
                    </label>

                    <label
                      className={cn(
                        'block cursor-pointer rounded-lg border p-4 transition-colors',
                        paymentMethod === 'card' ? 'border-primary bg-accent/30' : 'border-border'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="card" />
                        <div>
                          <span className="font-medium">Credit / Debit Card</span>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, etc.</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>Review Order</Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Delivery Address</h3>
                    {addresses.find((a) => a.id === selectedAddress) && (
                      <p className="text-sm text-muted-foreground">
                        {(() => {
                          const addr = addresses.find((a) => a.id === selectedAddress)!;
                          return `${addr.name}, ${addr.street}, ${addr.city}, ${addr.state} - ${addr.pincode}`;
                        })()}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Size: {item.size} • Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-medium mt-1">
                              ₹{item.product.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder}>Place Order</Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Items ({items.reduce((c, i) => c + i.quantity, 0)})
                  </span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-accent-foreground">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
