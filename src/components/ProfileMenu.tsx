import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  LogIn,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface ProfileMenuProps {
  onSignOut?: () => void; // Make it optional since we'll handle it internally
}

export const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/', { replace: true });
    setIsOpen(false);
  };

  const handleSignIn = () => {
    navigate('/login', { replace: true });
    setIsOpen(false);
  };

  const baseMenuItems = [
    {
      icon: ShoppingBag,
      label: 'My Orders',
      onClick: () => navigate('/profile/orders'),
    },
    {
      icon: Heart,
      label: 'Wishlist',
      onClick: () => navigate('/profile/wishlist'),
    },
  ];

  const adminMenuItem = {
    icon: PlusCircle,
    label: 'Add New Product',
    onClick: () => navigate('/products/new'),
    className: 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-dark-border',
  };

  const remainingMenuItems = [
    {
      icon: CreditCard,
      label: 'Payment Methods',
      onClick: () => navigate('/profile/payment'),
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => navigate('/profile/settings'),
    },
    {
      icon: LogOut,
      label: 'Sign Out',
      onClick: handleSignOut,
      className: 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300',
    },
  ];

  const authenticatedMenuItems = [
    ...baseMenuItems,
    ...(isAdmin ? [adminMenuItem] : []),
    ...remainingMenuItems,
  ];

  const unauthenticatedMenuItems = [
    {
      icon: LogIn,
      label: 'Sign In',
      onClick: handleSignIn,
      className: 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300',
    },
  ];

  const menuItems = isAuthenticated ? authenticatedMenuItems : unauthenticatedMenuItems;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 sm:space-x-2 text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors duration-200"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
          <User size={18} className="sm:size-20 relative" />
        </div>
        {isAuthenticated && (
          <span className="text-xs sm:text-sm hidden md:inline-block font-medium">
            {user?.name || 'Profile'}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`sm:size-16 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 sm:mt-3 w-48 sm:w-56 bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg py-1 sm:py-2 z-50 ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 transform opacity-100 scale-100 transition-all duration-200">
          {isAuthenticated && user && (
            <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 dark:border-dark-border">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-dark-text mb-0.5">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-dark-text-secondary truncate">{user.email}</p>
            </div>
          )}
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left flex items-center space-x-2 sm:space-x-3 transition-colors duration-200 text-xs sm:text-sm ${
                  item.className || 'text-gray-700 dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-dark-border'
                }`}
              >
                <item.icon size={16} className="sm:size-18 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu; 