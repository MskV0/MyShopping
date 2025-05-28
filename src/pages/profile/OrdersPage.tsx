import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, DollarSign, ShoppingBag } from 'lucide-react';
import { useOrders } from '../../context/OrdersContext';
import styles from '../../styles/ProductsPage.module.css';

const OrdersPage: React.FC = () => {
  const { orders } = useOrders();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('./grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10"></div>
          <div className={`absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 ${styles['animate-blob']}`}></div>
          <div className={`absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 ${styles['animate-blob']} ${styles['animation-delay-2000']}`}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <div className="relative bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm rounded-2xl p-12 text-center shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
              <Package className="mx-auto h-16 w-16 text-indigo-400" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-dark-text">No orders yet</h2>
              <p className="mt-2 text-gray-500 dark:text-dark-text-secondary">Start shopping to see your orders here.</p>
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
              Your Orders
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-text-secondary">
            View and track your order history
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl opacity-75 transition-opacity blur-sm"></div>
              <div className="relative bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(order.orderDate)}
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-900 dark:text-dark-text">
                      <Package className="h-4 w-4 mr-2" />
                      Order ID: {order.id}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm font-medium text-gray-900 dark:text-dark-text">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      {order.totalItems} items
                    </div>
                    <div className="flex items-center text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {order.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-dark-card/50 rounded-xl border border-gray-100 dark:border-dark-border"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-dark-card rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-dark-text truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage; 