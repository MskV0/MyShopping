import React from 'react';
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          id={`product-${product.id}`}
          className={`${newProductId === product.id ? 'animate-highlight' : ''}`}
        >
          <ProductCard product={product} highlight={newProductId === product.id} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;