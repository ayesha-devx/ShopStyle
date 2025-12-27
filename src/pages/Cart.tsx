import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    applyCoupon,
    appliedCoupon,
    removeCoupon,
  } = useCart();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = React.useState('');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const result = applyCoupon(couponCode);
    if (result.valid) {
      toast({ title: 'Coupon applied!', description: `You saved ${result.discount}%` });
      setCouponCode('');
    } else {
      toast({ title: 'Invalid coupon', description: 'Please check the code.', variant: 'destructive' });
    }
  };

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const deliveryFee = subtotal > 999 ? 0 : 99;
  const total = getCartTotal() + deliveryFee;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart ({items.length} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="bg-card rounded-lg p-4 flex gap-4"
              >
                <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-32 object-cover rounded-md"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">
                        {item.product.brand}
                      </p>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-medium text-foreground hover:text-primary line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>• Color: {item.color}</span>}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">₹{item.product.price * item.quantity}</p>
                      {item.product.discount > 0 && (
                        <p className="text-xs text-muted-foreground line-through">
                          ₹{item.product.originalPrice * item.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-accent/50 rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-accent-foreground" />
                      <span className="text-sm font-medium">{appliedCoupon.code}</span>
                      <span className="text-xs text-accent-foreground">
                        ({appliedCoupon.discount}% off)
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeCoupon}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Try: SAVE10, SAVE20, FIRST50
                </p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
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
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{999 - subtotal + discount} more for free delivery
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
