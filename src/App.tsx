import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { LoadingProvider } from './context/LoadingContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { PreferencesProvider } from './context/PreferencesContext';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfileLayout from './components/ProfileLayout';
import OrdersPage from './pages/profile/OrdersPage';
import WishlistPage from './pages/profile/WishlistPage';
import PaymentMethodsPage from './pages/profile/PaymentMethodsPage';
import SettingsPage from './pages/profile/SettingsPage';
import FAQPage from './pages/policies/FAQPage';
import ShippingPolicyPage from './pages/policies/ShippingPolicyPage';
import Returnspage from './pages/policies/Returnspage';
import PrivacyPolicyPage from './pages/policies/PrivacyPolicyPage';
import TermsPage from './pages/policies/TermsPage';
import AddNewProductPage from './pages/AddNewProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { OrdersProvider } from './context/OrdersContext';

function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <LoadingProvider>
          <CartProvider>
            <WishlistProvider>
              <OrdersProvider>
                <Router>
                  <div className="flex flex-col min-h-screen bg-gradient-glow bg-gradient-mesh">
                    <Navbar />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                          <Route 
                            path="/products/new" 
                            element={
                              <AdminRoute>
                                <AddNewProductPage />
                              </AdminRoute>
                            } 
                          />
                          <Route path="/products/:id" element={<ProductDetailPage />} />
                          <Route 
                            path="/cart" 
                            element={
                              <PrivateRoute>
                                <CartPage />
                              </PrivateRoute>
                            } 
                          />
                          <Route 
                            path="/checkout" 
                            element={
                              <PrivateRoute>
                                <CheckoutPage />
                              </PrivateRoute>
                            } 
                          />
                          <Route 
                            path="/order-confirmation" 
                            element={
                              <PrivateRoute>
                                <OrderConfirmationPage />
                              </PrivateRoute>
                            } 
                          />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        
                        {/* Profile Routes */}
                          <Route 
                            path="/profile" 
                            element={
                              <PrivateRoute>
                                <ProfileLayout />
                              </PrivateRoute>
                            }
                          >
                          <Route index element={<Navigate to="/profile/orders" replace />} />
                          <Route path="orders" element={<OrdersPage />} />
                          <Route path="wishlist" element={<WishlistPage />} />
                          <Route path="payment" element={<PaymentMethodsPage />} />
                          <Route path="settings" element={<SettingsPage />} />
                        </Route>

                        {/* Policy Routes */}
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/shipping" element={<ShippingPolicyPage />} />
                        <Route path="/returns" element={<Returnspage />} />
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                  <Toaster 
                    position="top-right"
                    toastOptions={{
                        className: '',
                      duration: 3000,
                      style: {
                          background: '#fff',
                          color: '#363636',
                        padding: '16px',
                        borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      },
                      success: {
                          style: {
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            color: '#166534'
                        },
                      },
                      error: {
                          style: {
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#991b1b'
                        },
                      },
                    }}
                  />
                </Router>
              </OrdersProvider>
            </WishlistProvider>
          </CartProvider>
        </LoadingProvider>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;