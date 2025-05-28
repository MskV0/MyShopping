import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleQuickLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:support@shoppyglobe.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+15551234567';
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('./grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <div className="relative bg-gray-900 rounded-lg p-2 flex items-center">
                  <img src="./favicon.svg" alt="ShoppyGlobe" className="h-8 w-8 mr-2" />
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">ShoppyGlobe</h3>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed hover:text-gray-300 transition-colors duration-300">
              Your one-stop destination for all your shopping needs. Quality products, competitive prices, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick('https://facebook.com/shoppyglobe')}
                className="relative group"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <div className="relative bg-gray-800 p-2 rounded-lg group-hover:bg-gray-800/50 transition-colors">
                  <Facebook size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </button>
              <button
                onClick={() => handleSocialClick('https://twitter.com/shoppyglobe')}
                className="relative group"
                aria-label="Twitter"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <div className="relative bg-gray-800 p-2 rounded-lg group-hover:bg-gray-800/50 transition-colors">
                  <Twitter size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </button>
              <button
                onClick={() => handleSocialClick('https://instagram.com/shoppyglobe')}
                className="relative group"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <div className="relative bg-gray-800 p-2 rounded-lg group-hover:bg-gray-800/50 transition-colors">
                  <Instagram size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/products')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">Products</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/cart')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">Shopping Cart</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/profile')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">My Account</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/about')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/contact')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">Contact Us</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/faq')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/shipping')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">Shipping Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/returns')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">Returns & Refunds</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/privacy')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLinkClick('/terms')}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
                  <div className="relative p-2 rounded-lg">
                    <MapPin size={20} className="text-indigo-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors ml-2">123 Shopping Avenue, Retail District, NY 10001, USA</span>
              </li>
              <li>
                <button
                  onClick={handlePhoneClick}
                  className="flex items-center group w-full"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
                    <div className="relative p-2 rounded-lg">
                      <Phone size={20} className="text-indigo-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors ml-2 bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">+1 (555) 123-4567</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleEmailClick}
                  className="flex items-center group w-full"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
                    <div className="relative p-2 rounded-lg">
                      <Mail size={20} className="text-indigo-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors ml-2 bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">support@shoppyglobe.com</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm group">
              <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">
                &copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.
              </span>
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
                <div className="relative p-2 rounded-lg">
                  <CreditCard size={24} className="text-indigo-400 group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-white transition-colors bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">We accept all major credit cards</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;