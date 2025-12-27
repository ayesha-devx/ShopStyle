import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RefreshCw, Shield, Headphones } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import SkeletonCard from '@/components/product/SkeletonCard';
import { Button } from '@/components/ui/button';
import { api, Product } from '@/services/api';
import heroBanner from '@/assets/hero-banner.jpg';

const categories = [
  { name: 'Men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&h=400&fit=crop', path: '/products?category=men' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=400&fit=crop', path: '/products?category=women' },
  { name: 'Kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=300&h=400&fit=crop', path: '/products?category=kids' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=400&fit=crop', path: '/products?category=beauty' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop', path: '/products?category=footwear' },
];

const brands = [
  { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/200px-Logo_NIKE.svg.png' },
  { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/200px-Adidas_Logo.svg.png' },
  { name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Puma_complete_logo.svg/200px-Puma_complete_logo.svg.png' },
  { name: 'Levis', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png' },
];

const Index: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await api.getProducts({ sort: 'rating' });
        setFeaturedProducts(products.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={heroBanner}
          alt="Fashion collection hero banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg text-card">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                New Season Arrivals
              </h1>
              <p className="text-lg mb-6 opacity-90">
                Discover the latest trends in fashion. Up to 50% off on selected items.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-card/10 border-card text-card hover:bg-card hover:text-foreground" asChild>
                  <Link to="/products?category=women">Women's Collection</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <Link to="/products" className="text-primary font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-card font-semibold text-lg">{category.name}</h3>
                <span className="text-card/80 text-sm group-hover:text-primary transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-8 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-2">Mega Sale!</h3>
              <p className="mb-4 opacity-90">Get up to 70% off on all items</p>
              <Button variant="secondary" asChild>
                <Link to="/products">Shop Sale</Link>
              </Button>
            </div>
            <div className="bg-secondary rounded-xl p-8 text-secondary-foreground">
              <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
              <p className="mb-4 opacity-90">Check out the latest trends</p>
              <Button variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
                <Link to="/products?sort=new">Explore New</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <Link to="/products" className="text-primary font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>

      {/* Trending Brands */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Trending Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/products?brand=${brand.name.toLowerCase()}`}
                className="bg-card rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <Truck className="h-6 w-6 text-accent-foreground" />
            </div>
            <h4 className="font-semibold mb-1">Free Shipping</h4>
            <p className="text-sm text-muted-foreground">On orders over ₹999</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-accent-foreground" />
            </div>
            <h4 className="font-semibold mb-1">Easy Returns</h4>
            <p className="text-sm text-muted-foreground">30-day return policy</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <Shield className="h-6 w-6 text-accent-foreground" />
            </div>
            <h4 className="font-semibold mb-1">Secure Payment</h4>
            <p className="text-sm text-muted-foreground">100% secure checkout</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <Headphones className="h-6 w-6 text-accent-foreground" />
            </div>
            <h4 className="font-semibold mb-1">24/7 Support</h4>
            <p className="text-sm text-muted-foreground">Dedicated customer care</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
