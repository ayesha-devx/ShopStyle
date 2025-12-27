import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface FilterState {
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  discount: number;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

const BRANDS = ['Roadster', 'SASSAFRAS', 'Nike', 'Max', 'Maybelline', 'Levis', 'Biba', 'Puma'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Green', hex: '#22C55E' },
];
const DISCOUNTS = [10, 20, 30, 40, 50];

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  className,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['brands', 'price', 'sizes']);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...filters.sizes, size]
      : filters.sizes.filter((s) => s !== size);
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter((c) => c !== color);
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleDiscountChange = (discount: number) => {
    onFiltersChange({ ...filters, discount: filters.discount === discount ? 0 : discount });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      brands: [],
      sizes: [],
      colors: [],
      priceRange: [0, 10000],
      discount: 0,
    });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.discount > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 10000;

  return (
    <div className={cn('bg-card rounded-lg p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Brands */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
          onClick={() => toggleSection('brands')}
        >
          Brand
          {expandedSections.includes('brands') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('brands') && (
          <div className="space-y-2 mt-2">
            {BRANDS.map((brand) => (
              <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Price Range */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
          onClick={() => toggleSection('price')}
        >
          Price Range
          {expandedSections.includes('price') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('price') && (
          <div className="mt-4 px-2">
            <Slider
              defaultValue={[0, 10000]}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              max={10000}
              step={100}
              onValueChange={handlePriceChange}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Sizes */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
          onClick={() => toggleSection('sizes')}
        >
          Size
          {expandedSections.includes('sizes') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('sizes') && (
          <div className="flex flex-wrap gap-2 mt-2">
            {SIZES.map((size) => (
              <button
                key={size}
                className={cn(
                  'px-3 py-1 text-sm border rounded-md transition-colors',
                  filters.sizes.includes(size)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:border-primary'
                )}
                onClick={() => handleSizeChange(size, !filters.sizes.includes(size))}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Colors */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
          onClick={() => toggleSection('colors')}
        >
          Color
          {expandedSections.includes('colors') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('colors') && (
          <div className="flex flex-wrap gap-2 mt-2">
            {COLORS.map((color) => (
              <button
                key={color.name}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all',
                  filters.colors.includes(color.name)
                    ? 'border-primary scale-110'
                    : 'border-transparent hover:scale-105'
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                onClick={() => handleColorChange(color.name, !filters.colors.includes(color.name))}
              />
            ))}
          </div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Discount */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
          onClick={() => toggleSection('discount')}
        >
          Discount
          {expandedSections.includes('discount') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('discount') && (
          <div className="space-y-2 mt-2">
            {DISCOUNTS.map((discount) => (
              <button
                key={discount}
                className={cn(
                  'block w-full text-left text-sm py-1 px-2 rounded transition-colors',
                  filters.discount === discount
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                )}
                onClick={() => handleDiscountChange(discount)}
              >
                {discount}% and above
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
