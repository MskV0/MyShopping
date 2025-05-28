import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../types';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (!prev.some(item => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}; 