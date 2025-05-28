import React from 'react';
import { Users, ShoppingBag, Shield, Rocket } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('./grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Shop
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              py
            </span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Globe
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed [text-shadow:_0_1px_0_rgb(255_255_255_/_100%)]">
            Welcome to ShoppyGlobe, your premier destination for online shopping. Founded with a vision to provide customers with a seamless shopping experience.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300">
              <p className="text-lg text-gray-700 leading-relaxed [text-shadow:_0_1px_0_rgb(255_255_255_/_100%)]">
                Established in 2025, ShoppyGlobe started as a small online marketplace and has since evolved into a comprehensive shopping platform. We believe in connecting customers with quality products at competitive prices while providing exceptional customer service.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Our Mission
            </span>
          </h2>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-gray-100/50">
                {[
                  {
                    title: 'Curated Selection',
                    description: 'Hand-picked high-quality products for our customers',
                    icon: <ShoppingBag className="w-8 h-8 text-indigo-600" />,
                    gradient: 'from-blue-600 to-indigo-600'
                  },
                  {
                    title: 'Customer Service',
                    description: 'Dedicated support team available 24/7',
                    icon: <Users className="w-8 h-8 text-purple-600" />,
                    gradient: 'from-indigo-600 to-purple-600'
                  },
                  {
                    title: 'Secure Shopping',
                    description: 'Safe and convenient shopping experience',
                    icon: <Shield className="w-8 h-8 text-purple-600" />,
                    gradient: 'from-purple-600 to-pink-600'
                  },
                  {
                    title: 'Fast Shipping',
                    description: 'Quick and reliable delivery worldwide',
                    icon: <Rocket className="w-8 h-8 text-pink-600" />,
                    gradient: 'from-pink-600 to-rose-600'
                  }
                ].map((item, index) => (
                  <div key={index} className="relative group/item p-8 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover/item:opacity-5 transition-opacity"></div>
                    <div className="relative flex items-center space-x-4">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-lg opacity-20 group-hover/item:opacity-30 transition-opacity blur-sm`}></div>
                        <div className="relative">{item.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Our Values
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Customer First',
                description: "We prioritize our customers' needs and satisfaction in everything we do.",
                gradient: 'from-blue-500 to-indigo-600'
              },
              {
                title: 'Quality',
                description: 'We maintain high standards in product selection and service delivery.',
                gradient: 'from-indigo-500 to-purple-600'
              },
              {
                title: 'Integrity',
                description: 'We conduct our business with honesty and transparency.',
                gradient: 'from-purple-500 to-pink-600'
              },
              {
                title: 'Innovation',
                description: 'We continuously improve our platform and services.',
                gradient: 'from-pink-500 to-rose-600'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} rounded-xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm`}></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 [text-shadow:_0_1px_0_rgb(255_255_255_/_100%)]">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Team
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed [text-shadow:_0_1px_0_rgb(255_255_255_/_100%)]">
              Our dedicated team of professionals works tirelessly to ensure you have the best shopping experience. From customer service representatives to tech experts, everyone at ShoppyGlobe is committed to excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;