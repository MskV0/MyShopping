import type { Product, User } from '../types';

const FAKESTORE_API_URL = 'https://fakestoreapi.com';
const DUMMYJSON_API_URL = 'https://dummyjson.com';

interface ApiError extends Error {
  status?: number;
  data?: any;
}

const handleApiError = (error: any, action: string): never => {
  console.error(`Error ${action}:`, error);
  const apiError: ApiError = new Error(`Failed ${action}`);
  apiError.status = error.status;
  apiError.data = error.data;
  throw apiError;
};

// Transform DummyJSON product to match our Product type
const transformDummyJSONProduct = (product: any): Product => ({
  id: product.id + 1000, // Add 1000 to avoid ID conflicts with FakeStore products
  title: product.title,
  price: product.price,
  description: product.description,
  category: product.category,
  image: product.thumbnail || product.images[0],
  rating: {
    rate: product.rating,
    count: product.stock
  }
});

// Fetch products from DummyJSON
const fetchDummyJSONProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${DUMMYJSON_API_URL}/products?limit=100`);
    if (!response.ok) {
      throw { status: response.status, message: `HTTP error! status: ${response.status}` };
    }
    const data = await response.json();
    return data.products.map(transformDummyJSONProduct);
  } catch (error) {
    console.error('Error fetching DummyJSON products:', error);
    return []; // Return empty array on error to still show FakeStore products
  }
};

// Fetch products from FakeStore
const fetchFakeStoreProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${FAKESTORE_API_URL}/products?limit=100`);
    if (!response.ok) {
      throw { status: response.status, message: `HTTP error! status: ${response.status}` };
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching FakeStore products:', error);
    return []; // Return empty array on error to still show DummyJSON products
  }
};

// Products API
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Fetch products from both APIs in parallel
    const [fakeStoreProducts, dummyJSONProducts] = await Promise.all([
      fetchFakeStoreProducts(),
      fetchDummyJSONProducts()
    ]);

    // Combine products from both sources
    const allProducts = [...fakeStoreProducts, ...dummyJSONProducts];

    return allProducts;
  } catch (error) {
    throw handleApiError(error, 'fetching products');
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${FAKESTORE_API_URL}/products/${id}`);
    if (!response.ok) {
      throw { status: response.status, message: `HTTP error! status: ${response.status}` };
    }
    return await response.json();
  } catch (error) {
    throw handleApiError(error, `fetching product ${id}`);
  }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${FAKESTORE_API_URL}/products/category/${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw { status: response.status, message: `HTTP error! status: ${response.status}` };
    }
    return await response.json();
  } catch (error) {
    throw handleApiError(error, `fetching products in category ${category}`);
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${FAKESTORE_API_URL}/products/categories`);
    if (!response.ok) {
      throw { status: response.status, message: `HTTP error! status: ${response.status}` };
    }
    return await response.json();
  } catch (error) {
    throw handleApiError(error, 'fetching categories');
  }
};

// User API
export const login = async (username: string, password: string): Promise<{ token: string }> => {
  try {
    const response = await fetch(`${FAKESTORE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw { 
        status: response.status, 
        message: 'Login failed', 
        data 
      };
    }
    
    return await response.json();
  } catch (error) {
    throw handleApiError(error, 'logging in');
  }
};

export const register = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await fetch(`${FAKESTORE_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw { 
        status: response.status, 
        message: 'Registration failed', 
        data 
      };
    }
    
    return await response.json();
  } catch (error) {
    throw handleApiError(error, 'registering user');
  }
};

// Cart API (simulated, as we're using context for cart management)
export const fetchCart = async (userId: number): Promise<any> => {
  try {
    const response = await fetch(`${FAKESTORE_API_URL}/carts/user/${userId}`);
    if (!response.ok) {
      throw { status: response.status, message: `HTTP error! status: ${response.status}` };
    }
    return await response.json();
  } catch (error) {
    throw handleApiError(error, `fetching cart for user ${userId}`);
  }
};