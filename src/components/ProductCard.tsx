import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import styles from '../styles/ProductsPage.module.css';
import { usePreferences } from '../context/PreferencesContext';

interface ProductCardProps {
  product: Product;
  highlight?: boolean;
  loading?: 'lazy' | 'eager';
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, highlight, loading = 'lazy' }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatCurrency } = usePreferences();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }, [addToCart, product]);

  const handleToggleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }, [toggleWishlist, product]);

  return (
    <Link
      to={`/products/${product.id}`}
      className={`block bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
        highlight ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        contain: 'content',
        willChange: 'transform',
      }}
    >
      <div className="relative aspect-square bg-gray-100 dark:bg-dark-border overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading={loading}
          onLoad={handleImageLoad}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease-out',
          }}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-dark-border animate-pulse" />
        )}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
            isInWishlist(product.id)
              ? 'bg-red-500 text-white'
              : 'bg-white/80 dark:bg-dark-card/80 text-gray-600 dark:text-dark-text hover:bg-red-500 hover:text-white'
          }`}
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(-100%)',
            opacity: isHovered ? 1 : 0,
          }}
        >
          <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-dark-text line-clamp-2 mb-1">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors duration-200"
            style={{
              transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
              opacity: isHovered ? 1 : 0,
            }}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;