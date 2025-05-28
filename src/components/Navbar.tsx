import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';
import ProfileMenu from './ProfileMenu';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-white to-indigo-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg backdrop-blur-sm shadow-lg relative">
      <div className="absolute inset-0 bg-[url('./grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <img src="/MyShopping/favicon.svg" alt="ShoppyGlobe" className="h-8 w-8 mr-2 relative" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">ShoppyGlobe</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-between pl-8">
            {/* Search Bar */}
            <div className="flex-1 max-w-md px-4">
              <SearchBar />
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 relative group">
                <span className="relative">
                  Home
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </Link>
              <Link to="/products" className="text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 relative group">
                <span className="relative">
                  Products
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 relative group">
                <span className="relative">
                  About
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </Link>
              <Link to="/contact" className="text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 relative group">
                <span className="relative">
                  Contact
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </Link>
            </div>

            {/* Profile and Cart */}
            <div className="flex items-center space-x-4 ml-6">
              <ProfileMenu />
              <Link to="/cart" className="text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 relative group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
                  <ShoppingCart size={20} className="relative" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 relative group mr-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
                <ShoppingCart size={20} className="relative" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
              <div className="relative">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-dark-bg/95 backdrop-blur-sm border-t border-gray-100 dark:border-dark-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="mb-4">
              <SearchBar isMobile onClose={() => setIsMenuOpen(false)} />
            </div>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-dark-border transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-dark-border transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-dark-border transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-dark-border transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="px-3 py-2">
              <ProfileMenu />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;