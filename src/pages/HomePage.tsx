import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../api';
import type { Product } from '../types';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts();
        // Get 8 random products for featured section
        const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
        setFeaturedProducts(randomProducts);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedCategories />
      
      {/* Featured Products Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-indigo-50 to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-indigo-600 mr-2" />
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Handpicked for You
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <div className="py-2">
              <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                Discover our curated selection of top products, chosen just for you
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <ProductGrid 
              products={featuredProducts} 
              isLoading={isLoading} 
              error={error || undefined} 
            />
          </div>
          
          {!isLoading && !error && (
            <div className="mt-12 text-center">
              <Link 
                to="/products" 
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 leading-relaxed pb-2">
                  Why Choose
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 tracking-tight leading-relaxed pb-2 min-h-[1.2em]">
                  &nbsp;ShoppyGlobe
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 leading-relaxed pb-2">
                  ?
                </span>
              </h2>
              <div className="py-2 mb-8">
                <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed [text-shadow:_0_1px_0_rgb(255_255_255_/_100%)]">
                  We're committed to providing the best shopping experience for our customers.
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    title: 'Quality Products',
                    description: 'We carefully select each product to ensure the highest quality for our customers.',
                    icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ),
                    gradient: 'from-blue-500 to-indigo-600'
                  },
                  {
                    title: 'Competitive Prices',
                    description: 'Get the best value for your money with our competitive pricing strategy.',
                    icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    gradient: 'from-indigo-500 to-purple-600'
                  },
                  {
                    title: 'Fast Shipping',
                    description: 'We deliver your orders quickly and efficiently to your doorstep.',
                    icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    gradient: 'from-purple-500 to-pink-600'
                  }
                ].map((feature, index) => (
                  <div key={index} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm`}></div>
                    <div className="relative bg-white p-6 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                            {feature.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-sm text-gray-700 font-medium leading-relaxed sm:text-base">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
                <img 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Customer satisfaction" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;