import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        'group block bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            {product.discount}% OFF
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'absolute top-2 right-2 bg-card/80 hover:bg-card shadow-sm',
            inWishlist && 'text-primary'
          )}
          onClick={handleWishlistClick}
        >
          <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
        </Button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-1 bg-accent/50 px-2 py-0.5 rounded text-xs">
            <span className="font-medium">{product.rating}</span>
            <Star className="h-3 w-3 fill-primary text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">₹{product.price}</span>
          {product.discount > 0 && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
              <span className="text-xs text-accent-foreground font-medium">
                ({product.discount}% off)
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
