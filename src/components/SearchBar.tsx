import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { fetchProducts } from '../api';
import type { Product } from '../types';

interface SearchBarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isMobile, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const products = await fetchProducts();
        const filtered = products
          .filter(product =>
            product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            product.category.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions(filtered);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
      onClose?.();
    }
  };

  const handleSuggestionClick = (productId: number) => {
    navigate(`/products/${productId}`);
    setSearchQuery('');
    setShowSuggestions(false);
    onClose?.();
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className={`w-full pl-4 pr-20 py-2 rounded-full border border-gray-300 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-gray-50 dark:bg-dark-card hover:bg-white dark:hover:bg-dark-border transition-colors duration-200 dark:text-dark-text dark:placeholder-dark-text-secondary`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSuggestions([]);
              }}
              className="p-1 text-gray-400 hover:text-gray-600 dark:text-dark-text-secondary dark:hover:text-dark-text"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            className="p-1 text-gray-500 hover:text-indigo-600 dark:text-dark-text-secondary dark:hover:text-indigo-400"
            disabled={!searchQuery.trim()}
          >
            <Search size={18} />
          </button>
        </div>
      </form>

      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-dark-border max-h-96 overflow-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-dark-text-secondary">Loading...</div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => handleSuggestionClick(product.id)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-dark-border flex items-center space-x-3 group"
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-dark-border rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-dark-text truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {product.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-dark-text-secondary">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 