import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useCart();
  const { toast } = useToast();

  const [selectedOptions, setSelectedOptions] = React.useState<Record<string, { size: string; color: string }>>({});

  const handleMoveToCart = (productId: string) => {
    const product = wishlist.find((p) => p.id === productId);
    if (!product) return;

    const options = selectedOptions[productId] || {
      size: product.sizes[0] || '',
      color: product.colors[0]?.name || '',
    };

    if (product.sizes.length > 0 && !options.size) {
      toast({ title: 'Please select a size', variant: 'destructive' });
      return;
    }

    moveToCart(product, options.size, options.color);
    toast({ title: 'Moved to cart', description: `${product.name} added to your cart.` });
  };

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and revisit them anytime.
            </p>
            <Button asChild>
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">My Wishlist ({wishlist.length} items)</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-card rounded-lg overflow-hidden shadow-sm">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              <div className="p-4">
                <p className="text-xs text-muted-foreground uppercase mb-1">
                  {product.brand}
                </p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-sm font-medium line-clamp-2 mb-2 hover:text-primary">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold">₹{product.price}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-xs text-accent-foreground">
                        {product.discount}% off
                      </span>
                    </>
                  )}
                </div>

                {/* Size selector */}
                {product.sizes.length > 0 && (
                  <Select
                    value={selectedOptions[product.id]?.size || ''}
                    onValueChange={(value) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        [product.id]: {
                          ...selectedOptions[product.id],
                          size: value,
                          color: selectedOptions[product.id]?.color || product.colors[0]?.name || '',
                        },
                      })
                    }
                  >
                    <SelectTrigger className="mb-3 h-9">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleMoveToCart(product.id)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      removeFromWishlist(product.id);
                      toast({ title: 'Removed from wishlist' });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
