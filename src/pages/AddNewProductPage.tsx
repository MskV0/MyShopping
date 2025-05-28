import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import toast from 'react-hot-toast';
import { 
  Upload, 
  ArrowLeft, 
  ChevronDown, 
  Package2,
  CircleDollarSign,
  ShoppingBag,
  Store
} from 'lucide-react';
import useProducts from '../hooks/useProducts';

const AddNewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'rating'>>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  });
  const [priceInput, setPriceInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setPreviewImage('');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      setPriceInput(value);
      const numberValue = value === '' ? 0 : parseFloat(value);
      if (!isNaN(numberValue)) {
        setFormData(prev => ({
          ...prev,
          price: numberValue
        }));
      }
    } else if (name === 'image') {
      setFormData(prev => ({
        ...prev,
        image: value
      }));
      if (value.trim()) {
        setPreviewImage(value);
      } else {
        setPreviewImage('');
        setImageError(false);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCategorySelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.price <= 0) {
      toast.error('Please enter a valid price greater than 0');
      return;
    }
    
    setIsLoading(true);

    try {
      const newProduct = addProduct(formData);
      
      // Wait for a brief moment to ensure state updates are processed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      toast.success('Product added successfully!');
      
      // Navigate to products page with a query parameter to scroll to the new product
      navigate(`/products?new=${newProduct.id}`);
    } catch (error) {
      toast.error('Failed to add product. Please try again.');
      console.error('Error adding product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCategoryIcon = () => {
    switch (formData.category) {
      case 'electronics':
        return <Package2 size={18} className="text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />;
      case 'jewelery':
        return <CircleDollarSign size={18} className="text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />;
      case "men's clothing":
      case "women's clothing":
        return <ShoppingBag size={18} className="text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />;
      default:
        return <Store size={18} className="text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />;
    }
  };

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "jewelery", label: "Jewelry" },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" }
  ];

  return (
    <div className="min-h-screen bg-gradient-glow bg-gradient-mesh">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('./grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      </div>
      <div className="max-w-5xl mx-auto p-6 relative">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
              <ArrowLeft size={20} className="relative mr-2" />
            </div>
            <span>Back to Products</span>
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-4 mb-2">Add New Product</h1>
          <p className="text-gray-600">Create a new product listing with detailed information.</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Product Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Product Information</h2>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white"
                    placeholder="Enter product title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        min="0.01"
                        step="0.01"
                        value={priceInput}
                        onChange={handleInputChange}
                        onFocus={(e) => {
                          if (e.target.value === '0') {
                            setPriceInput('');
                          }
                        }}
                        onBlur={(e) => {
                          if (e.target.value === '') {
                            setPriceInput('0');
                            setFormData(prev => ({ ...prev, price: 0 }));
                          }
                        }}
                        className="w-full pl-8 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white text-left flex items-center justify-between group"
                      >
                        <span className={formData.category ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.category ? categories.find(c => c.value === formData.category)?.label : 'Select a category'}
                        </span>
                        <ChevronDown 
                          size={18} 
                          className={`text-gray-500 group-hover:text-indigo-600 transition-all duration-200 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                          <div className="py-1 max-h-60 overflow-auto">
                            {categories.map((category) => (
                              <button
                                key={category.value}
                                type="button"
                                onClick={() => handleCategorySelect(category.value)}
                                className={`w-full px-4 py-2.5 text-left hover:bg-indigo-50 transition-colors duration-200 ${
                                  formData.category === category.value 
                                    ? 'bg-indigo-50 text-indigo-600' 
                                    : 'text-gray-900'
                                }`}
                              >
                                {category.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white"
                    placeholder="Enter product description"
                  />
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Product Image</h2>
                <div className="group border-2 border-dashed border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-indigo-500 bg-white/70 backdrop-blur-sm hover:bg-white">
                  <div className="space-y-4">
                    {previewImage ? (
                      <div className="relative group">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-64 object-contain rounded-lg"
                          onLoad={handleImageLoad}
                          onError={handleImageError}
                        />
                        {!imageError && (
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white font-medium">
                              Change Image
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>
                          <Upload className="h-16 w-16 text-gray-400 mb-4 relative group-hover:text-indigo-600 transition-colors duration-200" strokeWidth={1} />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Drag and drop or paste URL</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    <input
                      id="image"
                      name="image"
                      type="url"
                      required
                      value={formData.image}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border ${
                        imageError ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white`}
                      placeholder="Enter image URL"
                    />
                    {imageError && (
                      <p className="mt-2 text-sm text-red-600">
                        Invalid image URL. Please provide a valid image link.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-12 flex items-center justify-end space-x-4 border-t border-gray-100/50 pt-6">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="group relative px-6 py-3 rounded-xl text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gray-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative">Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="relative group px-6 py-3 rounded-xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 shadow-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-200 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-200"></div>
                <span className="relative">{isLoading ? 'Adding...' : 'Add Product'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProductPage; 