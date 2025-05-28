import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import styles from '../styles/ProductsPage.module.css';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
  const { items, totalItems, totalAmount, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Save the order
    addOrder(items, totalAmount + totalAmount * 0.1, totalItems);
    
    // Clear the cart
    clearCart();
    
    // Show success message
    toast.success('Order placed successfully!');
    
    // Navigate to orders page
    navigate('/profile/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10"></div>
          <div className={`absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 ${styles['animate-blob']}`}></div>
          <div className={`absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 ${styles['animate-blob']} ${styles['animation-delay-2000']}`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 ${styles['animate-blob']} ${styles['animation-delay-4000']}`}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <div className="relative bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm rounded-2xl p-12 text-center shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
              <ShoppingBag className="mx-auto h-16 w-16 text-indigo-400" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-dark-text">Your cart is empty</h2>
              <p className="mt-2 text-gray-500 dark:text-dark-text-secondary">Looks like you haven't added any products to your cart yet.</p>
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Continue Shopping
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
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10"></div>
        <div className={`absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 ${styles['animate-blob']}`}></div>
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 ${styles['animate-blob']} ${styles['animation-delay-2000']}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 ${styles['animate-blob']} ${styles['animation-delay-4000']}`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
              Shopping Cart
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-text-secondary">
            Review and manage your selected items
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl opacity-75 transition-opacity blur-sm"></div>
              <div className="relative bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all duration-300">
                <div className="divide-y divide-gray-200 dark:divide-dark-border">
                  {items.map((item) => (
                    <div key={item.id} className="py-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 dark:bg-dark-card rounded-xl overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900 dark:text-dark-text">
                                <Link to={`/products/${item.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                  {item.title}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">{item.category}</p>
                            </div>
                            <p className="text-base font-medium text-gray-900 dark:text-dark-text">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center border border-gray-200 dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm">
                                <button
                                  type="button"
                                  className="p-2 text-gray-600 dark:text-dark-text-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 text-gray-900 dark:text-dark-text">{item.quantity}</span>
                                <button
                                  type="button"
                                  className="p-2 text-gray-600 dark:text-dark-text-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <button
                                type="button"
                                className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Link
                    to="/products"
                    className="inline-flex items-center px-6 py-3 border border-gray-200 dark:border-dark-border rounded-xl text-base font-medium text-gray-700 dark:text-dark-text bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm hover:bg-white dark:hover:bg-dark-card transition-all duration-200"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Continue Shopping
                  </Link>
                  
                  <button
                    type="button"
                    onClick={clearCart}
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all duration-200"
                  >
                    <Trash2 className="mr-2 h-5 w-5" />
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl opacity-75 transition-opacity blur-sm"></div>
              <div className="relative bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all duration-300">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-dark-text-secondary">Subtotal ({totalItems} items)</p>
                    <p className="font-medium text-gray-900 dark:text-dark-text">${totalAmount.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-dark-text-secondary">Shipping</p>
                    <p className="font-medium text-gray-900 dark:text-dark-text">Free</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-dark-text-secondary">Tax</p>
                    <p className="font-medium text-gray-900 dark:text-dark-text">${(totalAmount * 0.1).toFixed(2)}</p>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-dark-border pt-4 flex justify-between">
                    <p className="text-lg font-medium text-gray-900 dark:text-dark-text">Total</p>
                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                      ${(totalAmount + totalAmount * 0.1).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
                  >
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-8">
                      <img src="/icons/payment/visa.svg" alt="Visa" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-16 h-8">
                      <img src="/icons/payment/mastercard.svg" alt="Mastercard" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-16 h-8">
                      <img src="/icons/payment/amex.svg" alt="American Express" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-16 h-8">
                      <img src="/icons/payment/paypal.svg" alt="PayPal" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;