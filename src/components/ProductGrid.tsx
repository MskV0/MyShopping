import React, { useCallback, useRef, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';
import styles from '../styles/ProductsPage.module.css';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  error?: string;
  newProductId?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading, error, newProductId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  
  // Calculate grid columns based on viewport width
  const getGridColumns = useCallback(() => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width < 1280) return 3;
    return 4;
  }, []);

  const [columns, setColumns] = React.useState(getGridColumns());

  // Update columns on resize
  useEffect(() => {
    const handleResize = () => {
      setColumns(getGridColumns());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getGridColumns]);

  // Handle scroll and update visible range
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemHeight = 400; // Approximate height of each product card
      const itemsPerRow = columns;
      const rowHeight = itemHeight + 24; // itemHeight + gap

      const startRow = Math.floor(scrollTop / rowHeight);
      const visibleRows = Math.ceil(containerHeight / rowHeight);
      const bufferRows = 2; // Number of rows to render above and below visible area

      const start = Math.max(0, (startRow - bufferRows) * itemsPerRow);
      const end = Math.min(
        products.length,
        (startRow + visibleRows + bufferRows) * itemsPerRow
      );

      setVisibleRange({ start, end });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [columns, products.length]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-dark-border"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 dark:bg-dark-border rounded w-1/4 mb-2"></div>
              <div className="h-8 bg-gray-300 dark:bg-dark-border rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-dark-border rounded w-1/2 mb-2"></div>
              <div className="flex justify-between items-center mt-4">
                <div className="h-6 bg-gray-300 dark:bg-dark-border rounded w-1/4"></div>
                <div className="h-8 w-8 bg-gray-300 dark:bg-dark-border rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 text-xl mb-4">Error loading products</div>
        <p className="text-gray-600 dark:text-dark-text-secondary">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-gray-500 dark:text-dark-text text-xl mb-4">No products found</div>
        <p className="text-gray-600 dark:text-dark-text-secondary">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  const visibleProducts = products.slice(visibleRange.start, visibleRange.end);
  const totalHeight = Math.ceil(products.length / columns) * (400 + 24); // itemHeight + gap

  return (
    <div 
      ref={containerRef}
      className="min-h-[800px] overflow-auto"
      style={{
        contain: 'paint',
        willChange: 'transform',
        position: 'relative',
      }}
    >
      <div
        style={{
          height: `${totalHeight}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${Math.floor(visibleRange.start / columns) * (400 + 24)}px)`,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              id={`product-${product.id}`}
              className={`${newProductId === product.id ? 'animate-highlight' : ''}`}
              style={{
                contain: 'paint',
                willChange: 'transform',
                pointerEvents: 'auto',
              }}
            >
              <ProductCard 
                product={product} 
                highlight={newProductId === product.id}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductGrid);