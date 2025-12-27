import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import SkeletonCard from '@/components/product/SkeletonCard';
import ProductFilters, { FilterState } from '@/components/product/ProductFilters';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { api, Product } from '@/services/api';
import { cn } from '@/lib/utils';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    sizes: [],
    colors: [],
    priceRange: [0, 10000],
    discount: 0,
  });
  const [sortBy, setSortBy] = useState('popularity');

  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let fetchedProducts = await api.getProducts({
          category: category || undefined,
          sort: sortBy,
        });

        // Apply client-side filters
        if (filters.brands.length > 0) {
          fetchedProducts = fetchedProducts.filter((p) =>
            filters.brands.some((b) => b.toLowerCase() === p.brand.toLowerCase())
          );
        }
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) {
          fetchedProducts = fetchedProducts.filter(
            (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
          );
        }
        if (filters.discount > 0) {
          fetchedProducts = fetchedProducts.filter((p) => p.discount >= filters.discount);
        }
        if (searchQuery) {
          fetchedProducts = fetchedProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.brand.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery, sortBy, filters]);

  const getCategoryTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (category) return category.charAt(0).toUpperCase() + category.slice(1);
    return 'All Products';
  };

  const activeFilterCount =
    filters.brands.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.discount > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <nav className="text-sm text-muted-foreground mb-2">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">{getCategoryTitle()}</span>
          </nav>
          <h1 className="text-2xl font-bold text-foreground">{getCategoryTitle()}</h1>
          <p className="text-muted-foreground mt-1">
            {isLoading ? 'Loading...' : `${products.length} products found`}
          </p>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {activeFilterCount > 0 && (
                        <Badge className="ml-2">{activeFilterCount}</Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <ProductFilters filters={filters} onFiltersChange={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Active Filter Tags */}
                {activeFilterCount > 0 && (
                  <div className="hidden md:flex items-center gap-2 flex-wrap">
                    {filters.brands.map((brand) => (
                      <Badge key={brand} variant="secondary" className="gap-1">
                        {brand}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() =>
                            setFilters({
                              ...filters,
                              brands: filters.brands.filter((b) => b !== brand),
                            })
                          }
                        />
                      </Badge>
                    ))}
                    {filters.discount > 0 && (
                      <Badge variant="secondary" className="gap-1">
                        {filters.discount}%+ off
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setFilters({ ...filters, discount: 0 })}
                        />
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Grid Toggle */}
                <div className="hidden md:flex items-center gap-1 bg-muted rounded-md p-1">
                  <Button
                    variant={gridCols === 3 ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridCols(3)}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridCols === 4 ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridCols(4)}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="discount">Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={cn(
                'grid gap-4 md:gap-6',
                gridCols === 3
                  ? 'grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              )}
            >
              {isLoading
                ? Array(8)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                : products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>

            {/* Empty State */}
            {!isLoading && products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      brands: [],
                      sizes: [],
                      colors: [],
                      priceRange: [0, 10000],
                      discount: 0,
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination placeholder */}
            {products.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  <Button variant="outline">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Next</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
