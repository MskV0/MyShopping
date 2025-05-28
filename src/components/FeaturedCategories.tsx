import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Gadgets and devices for modern living',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'jewelery',
    name: 'Jewelry',
    description: 'Elegant accessories for every occasion',
    image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'men\'s clothing',
    name: 'Men\'s Clothing',
    description: 'Stylish apparel for the modern man',
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'women\'s clothing',
    name: 'Women\'s Clothing',
    description: 'Fashionable clothing for every style',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const FeaturedCategories: React.FC = () => {
  return (
    <section id="categories" className="py-12 scroll-mt-16 bg-gradient-to-b from-gray-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 leading-relaxed pb-2">
              Shop
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white tracking-tight leading-relaxed pb-2 min-h-[1.2em]">
              &nbsp;by Category
            </span>
          </h2>
          <div className="py-2 mb-8">
            <p className="max-w-2xl mx-auto text-xl text-gray-300 sm:text-2xl leading-relaxed [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">
              Browse our wide selection of products across various categories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.id)}`}
              className="group relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm hover:bg-white/20 shadow-[0_0_15px_rgba(168,162,255,0.2)] hover:shadow-[0_0_30px_rgba(168,162,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10"></div>
              <div className="h-60 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-center object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6 relative z-20">
                <h3 className="text-xl font-semibold text-white group-hover:text-indigo-200 transition-colors">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center">
                  <span className="inline-flex items-center text-sm font-medium text-indigo-300 group-hover:text-indigo-200 transition-colors">
                    Shop now
                    <svg
                      className="ml-1 h-4 w-4 transition-all duration-300 transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
              <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;