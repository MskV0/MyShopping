import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBrowseCategories = () => {
    // First navigate to home if not already there
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const categoriesSection = document.getElementById('categories');
        if (categoriesSection) {
          categoriesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Increased timeout to ensure navigation completes
    } else {
      // If already on home page, just scroll
      const categoriesSection = document.getElementById('categories');
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="absolute inset-0 bg-[url('./grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="relative z-10 pb-6 sm:pb-8 md:pb-12 lg:max-w-2xl lg:w-full lg:pb-20 xl:pb-24">
          <div className="pt-6 sm:pt-10 md:pt-12 lg:pt-8 lg:pb-10 lg:overflow-visible">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight sm:leading-normal">
                    <span className="block text-white">
                      Discover Amazing
                    </span>
                    <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      Products
                    </span>
                  </h1>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-indigo-100 sm:max-w-xl md:mx-auto lg:mx-0">
                    Shop the latest trends with our curated collection of high-quality products. Fast shipping and excellent customer service guaranteed.
                  </p>
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                    <button
                      onClick={handleBrowseCategories}
                      className="relative group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                      <span className="relative flex items-center justify-center">
                        Browse Categories
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </span>
                    </button>
                    <Link
                      to="/products"
                      className="relative group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-xl text-indigo-100 bg-white/10 hover:bg-white/20 backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                      <span className="relative flex items-center justify-center">
                        Shop Now
                        <ShoppingBag className="ml-2 w-5 h-5" />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-6">
                  <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                    <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Shopping experience"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
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

export default Hero;