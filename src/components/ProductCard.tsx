import React from 'react';
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
}

const ProductCard: React.FC<ProductCardProps> = ({ product, highlight }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { formatCurrency } = usePreferences();
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the wishlist button
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <div className={`group relative bg-white dark:bg-dark-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
      highlight ? 'ring-2 ring-indigo-500 animate-highlight' : ''
    }`}>
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-dark-border">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block group">
          <h3 className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-dark-text group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(product.price)}
          </p>
          <button
            onClick={handleWishlistClick}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist(product.id)
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400 dark:text-dark-text-secondary'
              }`}
            />
          </button>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-dark-card"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;