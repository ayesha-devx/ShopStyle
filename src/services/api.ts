// API Service - Mock data for now, ready for backend integration

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  description: string;
  inStock: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  address: Address;
  paymentMethod: string;
  createdAt: string;
}

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Slim Fit Cotton Shirt',
    brand: 'Roadster',
    price: 799,
    originalPrice: 1499,
    discount: 47,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=800&fit=crop',
    ],
    category: 'men',
    subcategory: 'shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Blue', hex: '#3B82F6' }],
    rating: 4.3,
    reviewCount: 2847,
    description: 'A classic slim fit cotton shirt perfect for casual and semi-formal occasions. Made with 100% premium cotton for ultimate comfort.',
    inStock: true,
  },
  {
    id: '2',
    name: 'Floral Print Maxi Dress',
    brand: 'SASSAFRAS',
    price: 1299,
    originalPrice: 2599,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop',
    ],
    category: 'women',
    subcategory: 'dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Pink', hex: '#EC4899' }, { name: 'Yellow', hex: '#EAB308' }],
    rating: 4.5,
    reviewCount: 1523,
    description: 'Beautiful floral print maxi dress perfect for summer outings. Lightweight and breathable fabric.',
    inStock: true,
  },
  {
    id: '3',
    name: 'Running Sports Shoes',
    brand: 'Nike',
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
    ],
    category: 'footwear',
    subcategory: 'sports-shoes',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [{ name: 'Red', hex: '#EF4444' }, { name: 'Black', hex: '#000000' }],
    rating: 4.7,
    reviewCount: 4521,
    description: 'High-performance running shoes with advanced cushioning technology for maximum comfort during runs.',
    inStock: true,
  },
  {
    id: '4',
    name: 'Kids Cartoon Print T-Shirt',
    brand: 'Max',
    price: 399,
    originalPrice: 699,
    discount: 43,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=800&fit=crop',
    ],
    category: 'kids',
    subcategory: 'tshirts',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [{ name: 'Blue', hex: '#3B82F6' }, { name: 'Green', hex: '#22C55E' }],
    rating: 4.2,
    reviewCount: 876,
    description: 'Fun cartoon print t-shirt for kids. Made with soft cotton for all-day comfort.',
    inStock: true,
  },
  {
    id: '5',
    name: 'Luxury Lipstick Set',
    brand: 'Maybelline',
    price: 899,
    originalPrice: 1499,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=800&fit=crop',
    ],
    category: 'beauty',
    subcategory: 'lipstick',
    sizes: [],
    colors: [{ name: 'Red', hex: '#DC2626' }, { name: 'Nude', hex: '#D4A574' }, { name: 'Pink', hex: '#EC4899' }],
    rating: 4.4,
    reviewCount: 3214,
    description: 'Long-lasting luxury lipstick set with vibrant colors. Moisturizing formula for smooth application.',
    inStock: true,
  },
  {
    id: '6',
    name: 'Denim Jacket',
    brand: 'Levis',
    price: 2499,
    originalPrice: 4499,
    discount: 44,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
    ],
    category: 'men',
    subcategory: 'jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Blue', hex: '#1D4ED8' }, { name: 'Black', hex: '#000000' }],
    rating: 4.6,
    reviewCount: 1892,
    description: 'Classic denim jacket with a modern fit. Perfect for layering in any season.',
    inStock: true,
  },
  {
    id: '7',
    name: 'Ethnic Kurta Set',
    brand: 'Biba',
    price: 1599,
    originalPrice: 2999,
    discount: 47,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop',
    ],
    category: 'women',
    subcategory: 'kurtas',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Maroon', hex: '#7F1D1D' }, { name: 'Navy', hex: '#1E3A5F' }],
    rating: 4.4,
    reviewCount: 2156,
    description: 'Elegant ethnic kurta set with intricate embroidery. Perfect for festive occasions.',
    inStock: true,
  },
  {
    id: '8',
    name: 'Casual Sneakers',
    brand: 'Puma',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=800&fit=crop',
    ],
    category: 'footwear',
    subcategory: 'casual-shoes',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Grey', hex: '#6B7280' }],
    rating: 4.5,
    reviewCount: 3421,
    description: 'Stylish casual sneakers for everyday wear. Comfortable cushioning and durable sole.',
    inStock: true,
  },
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    userId: '1',
    items: [
      {
        product: mockProducts[0],
        quantity: 2,
        size: 'M',
        color: 'White',
      },
    ],
    total: 1598,
    status: 'delivered',
    address: {
      id: '1',
      name: 'John Doe',
      phone: '9876543210',
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    paymentMethod: 'UPI',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'ORD002',
    userId: '1',
    items: [
      {
        product: mockProducts[2],
        quantity: 1,
        size: 'UK 9',
        color: 'Red',
      },
    ],
    total: 4999,
    status: 'shipped',
    address: {
      id: '1',
      name: 'John Doe',
      phone: '9876543210',
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    paymentMethod: 'Card',
    createdAt: '2024-01-20T14:45:00Z',
  },
];

// Mock Users for Admin
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    addresses: [
      {
        id: '1',
        name: 'John Doe',
        phone: '9876543210',
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        isDefault: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543211',
    addresses: [],
  },
];

// API Functions (mock implementations)
export const api = {
  // Products
  getProducts: async (filters?: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
    color?: string;
    sort?: string;
  }): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filtered = [...mockProducts];
    
    if (filters?.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters?.brand) {
      filtered = filtered.filter(p => p.brand.toLowerCase() === filters.brand?.toLowerCase());
    }
    if (filters?.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }
    if (filters?.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters?.sort) {
      switch (filters.sort) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'discount':
          filtered.sort((a, b) => b.discount - a.discount);
          break;
      }
    }
    
    return filtered;
  },

  getProductById: async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.find(p => p.id === id) || null;
  },

  getRelatedProducts: async (category: string, excludeId: string): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.filter(p => p.category === category && p.id !== excludeId).slice(0, 4);
  },

  // Auth
  login: async (email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email && password) {
      return mockUsers[0];
    }
    return null;
  },

  register: async (name: string, email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: Date.now().toString(),
      name,
      email,
      phone: '',
      addresses: [],
    };
  },

  // Orders
  getOrders: async (userId?: string): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (userId) {
      return mockOrders.filter(o => o.userId === userId);
    }
    return mockOrders;
  },

  createOrder: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      ...order,
      id: `ORD${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
  },

  // Admin
  getAdminStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      totalUsers: mockUsers.length,
      totalOrders: mockOrders.length,
      totalRevenue: mockOrders.reduce((acc, order) => acc + order.total, 0),
      totalProducts: mockProducts.length,
    };
  },

  getAllUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers;
  },

  getAllOrders: async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockOrders;
  },
};

export default api;
