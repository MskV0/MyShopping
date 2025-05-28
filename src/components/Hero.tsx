import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="absolute inset-0 bg-[url('./grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-visible">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                  <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl leading-normal">
                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-x-4">
                      <div className="flex flex-col sm:flex-row items-baseline">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 leading-relaxed pb-2">
                          Shop
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white tracking-tight leading-relaxed pb-2 min-h-[1.2em]">
                          &nbsp;Smarter
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-baseline mt-2 sm:mt-0">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300 leading-relaxed pb-2">
                          Live
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 tracking-tight leading-relaxed pb-2 min-h-[1.2em]">
                          &nbsp;Better
                        </span>
                      </div>
                    </div>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Discover a world of amazing products at unbeatable prices. From fashion to electronics, we've got everything you need.
                  </p>
                  <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow-lg">
                        <Link
                          to="/products"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.7)]"
                        >
                          Shop Now
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a
                          href="#categories"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-100 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(168,162,255,0.3)] hover:shadow-[0_0_25px_rgba(168,162,255,0.5)]"
                        >
                          Browse Categories
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-indigo-900/90 via-indigo-900/50 to-transparent z-10"></div>
          <img
            className="h-full w-full object-cover"
            src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Shopping experience"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;