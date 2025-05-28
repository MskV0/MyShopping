import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, X, ShoppingBag, ChevronDown } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import Dropdown from '../components/Dropdown';
import { fetchCategories } from '../api';
import type { Product } from '../types';
import styles from '../styles/ProductsPage.module.css';
import useProducts from '../hooks/useProducts';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading: productsLoading, error: productsError } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const newProductId = searchParams.get('new');
  const gridRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scrolling to new product
  useEffect(() => {
    if (newProductId && gridRef.current) {
      const productElement = document.getElementById(`product-${newProductId}`);
      if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        productElement.classList.add('highlight-animation');
      }
    }
  }, [newProductId, filteredProducts]);

  // Scroll to top when component mounts or category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await fetchCategories();
        
        // Get unique categories from both API and local products
        const productCategories = [...new Set(products.map(product => product.category))];
        const uniqueCategories = [...new Set([...categoriesData, ...productCategories])];
        
        setCategories(uniqueCategories);
        
        // Find min and max price from products
        if (products.length > 0) {
          const prices = products.map(product => product.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          setPriceRange([minPrice, maxPrice]);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [products]);

  useEffect(() => {
    if (products.length === 0) {
      setFilteredProducts([]);
      return;
    }
    
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case 'price-low-high':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsSortOpen(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
    setIsMobileFilterOpen(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSortBy('');
    setSearchQuery('');
    setSearchParams({});
  };

  if (error || productsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error || productsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('./grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10"></div>
        <div className={`absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 ${styles['animate-blob']}`}></div>
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 ${styles['animate-blob']} ${styles['animation-delay-2000']}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 ${styles['animate-blob']} ${styles['animation-delay-4000']}`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={gridRef}>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400 leading-relaxed pb-2">
              {selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
                : 'Discover Our'
              }
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 tracking-tight leading-relaxed pb-2 min-h-[1.2em]">
              {selectedCategory ? ' Products' : ' Collection'}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-dark-text max-w-2xl mx-auto leading-relaxed [text-shadow:_0_1px_0_rgb(255_255_255_/_100%)] dark:[text-shadow:none]">
            Explore our curated collection of high-quality products
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
          <div className="relative bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-lg group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/70 dark:bg-dark-card/70 backdrop-blur-sm group-hover:bg-white dark:group-hover:bg-dark-card dark:text-dark-text dark:placeholder-dark-text-secondary"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-indigo-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-indigo-600 dark:text-dark-text-secondary dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                {/* Sort Dropdown */}
                <Dropdown
                  isOpen={isSortOpen}
                  onClose={() => setIsSortOpen(false)}
                  onToggle={() => setIsSortOpen(!isSortOpen)}
                  containerClassName="w-full md:w-auto"
                  trigger={
                    <button
                      type="button"
                      className="w-full md:w-48 px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white dark:hover:bg-dark-card text-left flex items-center justify-between group"
                    >
                      <span className={sortBy ? 'text-gray-900 dark:text-dark-text' : 'text-gray-500 dark:text-dark-text-secondary'}>
                        {sortBy ? (
                          sortBy === 'price-low-high' ? 'Price: Low to High' :
                          sortBy === 'price-high-low' ? 'Price: High to Low' :
                          'Rating'
                        ) : 'Sort By'}
                      </span>
                      <ChevronDown 
                        size={18} 
                        className={`text-gray-500 dark:text-dark-text-secondary group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-200 transform ${isSortOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  }
                >
                  <div className="py-1">
                    {[
                      { value: 'price-low-high', label: 'Price: Low to High' },
                      { value: 'price-high-low', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Rating' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSortChange(option.value)}
                        className={`w-full px-4 py-2.5 text-left hover:bg-indigo-50 dark:hover:bg-dark-border transition-colors duration-200 ${
                          sortBy === option.value 
                            ? 'bg-indigo-50 dark:bg-dark-border text-indigo-600 dark:text-indigo-400' 
                            : 'text-gray-900 dark:text-dark-text'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </Dropdown>

                {/* Category Filter */}
                <Dropdown
                  isOpen={isMobileFilterOpen}
                  onClose={() => setIsMobileFilterOpen(false)}
                  onToggle={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  containerClassName="w-full md:w-auto"
                  maxHeight="300px"
                  menuClassName="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500"
                  trigger={
                    <button
                      type="button"
                      className="w-full md:w-56 px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white dark:hover:bg-dark-card text-left flex items-center justify-between group"
                    >
                      <span className={selectedCategory ? 'text-gray-900 dark:text-dark-text' : 'text-gray-500 dark:text-dark-text-secondary'}>
                        {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'All Categories'}
                      </span>
                      <ChevronDown 
                        size={18} 
                        className={`text-gray-500 dark:text-dark-text-secondary group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-200 transform ${isMobileFilterOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  }
                >
                  <div className="divide-y divide-gray-100 dark:divide-dark-border">
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('')}
                      className={`w-full px-4 py-2.5 text-left hover:bg-indigo-50 dark:hover:bg-dark-border transition-colors duration-200 ${
                        !selectedCategory 
                          ? 'bg-indigo-50 dark:bg-dark-border text-indigo-600 dark:text-indigo-400' 
                          : 'text-gray-900 dark:text-dark-text'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full px-4 py-2.5 text-left hover:bg-indigo-50 dark:hover:bg-dark-border transition-colors duration-200 ${
                          selectedCategory === category 
                            ? 'bg-indigo-50 dark:bg-dark-border text-indigo-600 dark:text-indigo-400' 
                            : 'text-gray-900 dark:text-dark-text'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </Dropdown>

                {/* Clear Filters Button */}
                {(selectedCategory || sortBy || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="w-full md:w-auto px-6 py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-white/70 dark:bg-dark-card/70 backdrop-blur-sm border border-indigo-200 dark:border-indigo-400/30 rounded-xl hover:bg-white dark:hover:bg-dark-card hover:border-indigo-300 dark:hover:border-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.1)] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading || productsLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full opacity-75 blur-lg"></div>
              <div className="relative animate-spin rounded-full h-12 w-12 border-2 border-indigo-500 dark:border-indigo-400 border-t-transparent"></div>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="relative z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <div className="relative bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
              <ProductGrid 
                products={filteredProducts}
                newProductId={newProductId ? parseInt(newProductId) : undefined}
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <div className="relative bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm rounded-2xl p-12 text-center shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
              <ShoppingBag className="mx-auto h-12 w-12 text-indigo-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-dark-text">No products found</h3>
              <p className="mt-2 text-gray-500 dark:text-dark-text-secondary">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;