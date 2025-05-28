import { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../api';

const STORAGE_KEY = 'shoppyglobe_products';
const LOCAL_PRODUCTS_KEY = 'shoppyglobe_local_products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [localProducts, setLocalProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load API products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await fetchProducts();
        setApiProducts(fetchedProducts);
        // Merge API products with local products
        const mergedProducts = [...fetchedProducts, ...localProducts];
        setProducts(mergedProducts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedProducts));
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [localProducts]); // Re-run when local products change

  // Save local products whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(localProducts));
    // Update merged products immediately
    const mergedProducts = [...apiProducts, ...localProducts];
    setProducts(mergedProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedProducts));
  }, [localProducts, apiProducts]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.max(0, ...products.map(p => p.id), ...localProducts.map(p => p.id)) + 1,
      rating: { rate: 0, count: 0 }
    };
    setLocalProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    // Check if it's a local product
    if (localProducts.some(p => p.id === id)) {
      setLocalProducts(prev =>
        prev.map(product =>
          product.id === id ? { ...product, ...updates } : product
        )
      );
    } else {
      setProducts(prev =>
        prev.map(product =>
          product.id === id ? { ...product, ...updates } : product
        )
      );
    }
  };

  const deleteProduct = (id: number) => {
    // Check if it's a local product
    if (localProducts.some(p => p.id === id)) {
      setLocalProducts(prev => prev.filter(product => product.id !== id));
    } else {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const getProduct = (id: number) => {
    return products.find(product => product.id === id);
  };

  return {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct
  };
};

export default useProducts; 