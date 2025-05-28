import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types';
import toast from 'react-hot-toast';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'LOAD_CART'; payload: CartState };

const CART_STORAGE_KEY = 'shoppyglobe_cart';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : initialState;
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return initialState;
  }
};

const calculateTotals = (items: CartItem[]): { totalItems: number; totalAmount: number } => {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalAmount: acc.totalAmount + item.price * item.quantity,
    }),
    { totalItems: 0, totalAmount: 0 }
  );
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      let updatedItems: CartItem[];
      if (existingItemIndex !== -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const { totalItems, totalAmount } = calculateTotals(updatedItems);
      newState = { items: updatedItems, totalItems, totalAmount };
      break;
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const { totalItems, totalAmount } = calculateTotals(updatedItems);
      newState = { items: updatedItems, totalItems, totalAmount };
      break;
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: id });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const { totalItems, totalAmount } = calculateTotals(updatedItems);
      newState = { items: updatedItems, totalItems, totalAmount };
      break;
    }
    
    case 'CLEAR_CART':
      newState = initialState;
      break;

    case 'LOAD_CART':
      newState = action.payload;
      break;
      
    default:
      return state;
  }

  // Save to localStorage after each change
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }

  return newState;
};

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);
  
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success('Added to cart!');
  };
  
  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.success('Removed from cart!');
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared!');
  };
  
  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};