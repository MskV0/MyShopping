import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const withLoading = useCallback(async <T,>(promise: Promise<T>): Promise<T> => {
    try {
      setLoading(true);
      const result = await promise;
      return result;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, withLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}; 