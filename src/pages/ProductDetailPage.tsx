import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { fetchProductById, fetchProducts } from '../api';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/ProductGrid';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const productData = await fetchProductById(parseInt(id));
        setProduct(productData);
        setActiveImage(productData.image);
        
        // Load related products
        const allProducts = await fetchProducts();
        const related = allProducts
          .filter(p => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4);
        setRelatedProducts(related);
        
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-300 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-12 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
          <p className="text-gray-600 mb-6">{error || 'Product not found'}</p>
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to="/products" className="ml-2 text-gray-500 hover:text-gray-700">Products</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to={`/categories/${product.category}`} className="ml-2 text-gray-500 hover:text-gray-700">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium truncate max-w-xs">
                {product.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4 h-96 flex items-center justify-center">
              <img 
                src={activeImage} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button 
                className={`border rounded-md p-2 ${activeImage === product.image ? 'border-indigo-500' : 'border-gray-200'}`}
                onClick={() => setActiveImage(product.image)}
              >
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="h-16 w-full object-contain"
                />
              </button>
              {/* Additional product images would go here */}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.title}</h1>
            
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 ${
                      product.rating.rate > rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">
                {product.rating.rate} ({product.rating.count} reviews)
              </p>
            </div>
            
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              <p className="mt-1 text-sm text-gray-500">Price includes taxes</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 text-base text-gray-700 space-y-4">
                <p>{product.description}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center space-x-3">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="p-2 border border-gray-300 rounded-l-md"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="p-2 w-16 text-center border-t border-b border-gray-300"
                  />
                  <button
                    type="button"
                    className="p-2 border border-gray-300 rounded-r-md"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-100 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Wishlist
                </button>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="h-6 w-6 text-indigo-600 mr-2" />
                  <span className="text-sm text-gray-700">Free shipping over $50</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-6 w-6 text-indigo-600 mr-2" />
                  <span className="text-sm text-gray-700">30-day returns</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-indigo-600 mr-2" />
                  <span className="text-sm text-gray-700">2-year warranty</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center space-x-4">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 flex items-center"
              >
                <Share2 className="h-5 w-5 mr-1" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;