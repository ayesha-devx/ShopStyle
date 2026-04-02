import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, CartItem } from "@/services/api";

interface CartContextType {
  items: CartItem[];
  wishlist: Product[];
  addToCart: (
    product: Product,
    size: string,
    color: string,
    quantity?: number
  ) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (product: Product, size: string, color: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  applyCoupon: (code: string) => { valid: boolean; discount: number };
  appliedCoupon: { code: string; discount: number } | null;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const COUPONS: Record<string, number> = {
  SLAY10: 10, // New brand thematic code
  SQUAD25: 25, // For a "Slay Squad" discount
  FIRST50: 50,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedWishlist = localStorage.getItem("wishlist");
    const storedCoupon = localStorage.getItem("appliedCoupon");

    if (storedCart) setItems(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    if (storedCoupon) setAppliedCoupon(JSON.parse(storedCoupon));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem("appliedCoupon");
    }
  }, [appliedCoupon]);

  const addToCart = (
    product: Product,
    size: string,
    color: string,
    quantity = 1
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, size, color }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const moveToCart = (product: Product, size: string, color: string) => {
    addToCart(product, size, color);
    removeFromWishlist(product.id);
  };

  const getCartTotal = () => {
    const subtotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    if (appliedCoupon) {
      return subtotal - (subtotal * appliedCoupon.discount) / 100;
    }
    return subtotal;
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const applyCoupon = (code: string): { valid: boolean; discount: number } => {
    const discount = COUPONS[code.toUpperCase()];
    if (discount) {
      setAppliedCoupon({ code: code.toUpperCase(), discount });
      return { valid: true, discount };
    }
    return { valid: false, discount: 0 };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        moveToCart,
        getCartTotal,
        getCartCount,
        applyCoupon,
        appliedCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
