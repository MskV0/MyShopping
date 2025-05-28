import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { ShoppingBag, Heart, CreditCard, Settings, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileLayout: React.FC = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const baseMenuItems = [
    {
      icon: ShoppingBag,
      label: 'My Orders',
      path: '/profile/orders',
    },
    {
      icon: Heart,
      label: 'Wishlist',
      path: '/profile/wishlist',
    }
  ];

  const adminMenuItem = {
    icon: PlusCircle,
    label: 'Add New Product',
    path: '/products/new',
  };

  const remainingMenuItems = [
    {
      icon: CreditCard,
      label: 'Payment Methods',
      path: '/profile/payment',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/profile/settings',
    },
  ];

  // Combine menu items based on admin status
  const menuItems = [
    ...baseMenuItems,
    ...(isAdmin ? [adminMenuItem] : []),
    ...remainingMenuItems
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg py-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('./grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl opacity-75 transition-opacity blur-sm"></div>
                <div className="relative bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-dark-text">My Account</h2>
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                          location.pathname === item.path
                            ? 'bg-indigo-50 dark:bg-dark-border text-indigo-600 dark:text-indigo-400 font-medium'
                            : 'text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-border hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl opacity-75 transition-opacity blur-sm"></div>
              <div className="relative bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout; 