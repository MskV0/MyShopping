import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';

interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  orderDate: string;
  status: 'pending' | 'completed' | 'cancelled';
}

interface OrdersState {
  orders: Order[];
}

interface OrdersContextType extends OrdersState {
  addOrder: (items: CartItem[], totalAmount: number, totalItems: number) => void;
  getOrders: () => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'shoppyglobe_orders';

const initialState: OrdersState = {
  orders: []
};

type OrdersAction =
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'LOAD_ORDERS'; payload: OrdersState };

const ordersReducer = (state: OrdersState, action: OrdersAction): OrdersState => {
  switch (action.type) {
    case 'ADD_ORDER':
      const newState = {
        ...state,
        orders: [action.payload, ...state.orders]
      };
      // Save to localStorage
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case 'LOAD_ORDERS':
      return action.payload;

    default:
      return state;
  }
};

// Load orders from localStorage
const loadOrdersFromStorage = (): OrdersState => {
  try {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    return savedOrders ? JSON.parse(savedOrders) : initialState;
  } catch (error) {
    console.error('Error loading orders from storage:', error);
    return initialState;
  }
};

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = loadOrdersFromStorage();
    dispatch({ type: 'LOAD_ORDERS', payload: savedOrders });
  }, []);

  const addOrder = (items: CartItem[], totalAmount: number, totalItems: number) => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items,
      totalAmount,
      totalItems,
      orderDate: new Date().toISOString(),
      status: 'completed'
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
  };

  const getOrders = () => {
    return state.orders;
  };

  const value = {
    ...state,
    addOrder,
    getOrders
  };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}; 