import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface Preferences {
  language: string;
  currency: string;
  theme: 'light' | 'dark' | 'system';
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (newPreferences: Partial<Preferences>) => void;
  formatCurrency: (amount: number) => string;
  translate: (key: string) => string;
  currentTheme: 'light' | 'dark';
}

const defaultPreferences: Preferences = {
  language: 'en',
  currency: 'USD',
  theme: 'system',
};

const PreferencesContext = createContext<PreferencesContextType | null>(null);

const currencyFormatters: Record<string, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
  EUR: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }),
  GBP: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }),
};

// Simple translations object - in a real app, you'd want to use a proper i18n library
const translations: Record<string, Record<string, string>> = {
  en: {
    'common.home': 'Home',
    'common.products': 'Products',
    'common.cart': 'Cart',
    'common.account': 'Account',
    // Add more translations as needed
  },
  es: {
    'common.home': 'Inicio',
    'common.products': 'Productos',
    'common.cart': 'Carrito',
    'common.account': 'Cuenta',
  },
  fr: {
    'common.home': 'Accueil',
    'common.products': 'Produits',
    'common.cart': 'Panier',
    'common.account': 'Compte',
  },
};

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<Preferences>(() => {
    // Initialize preferences from localStorage or default
    const savedTheme = localStorage.getItem('shoppyglobe_theme') as 'light' | 'dark' | 'system' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    return {
      ...defaultPreferences,
      theme: savedTheme || 'system'
    };
  });
  
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(() => {
    // Initialize current theme based on preferences
    const savedTheme = localStorage.getItem('shoppyglobe_theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Load preferences when user changes
  useEffect(() => {
    if (user) {
      const savedSettings = localStorage.getItem(`shoppyglobe_user_settings_${user.id}`);
      if (savedSettings) {
        const userSettings = JSON.parse(savedSettings);
        if (userSettings.preferences) {
          setPreferences(userSettings.preferences);
          // Update current theme based on user preferences
          const themeToApply = userSettings.preferences.theme === 'system'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : userSettings.preferences.theme;
          setCurrentTheme(themeToApply);
        }
      }
    } else {
      // Reset to default preferences when logged out
      setPreferences(defaultPreferences);
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setCurrentTheme(systemTheme);
    }
  }, [user]);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      if (preferences.theme === 'system') {
        setCurrentTheme(systemTheme);
      }
    };

    // Initial check
    handleThemeChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [preferences.theme]);

  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    const themeToApply = preferences.theme === 'system' 
      ? currentTheme
      : preferences.theme;
    
    if (themeToApply === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save theme preference to localStorage
    localStorage.setItem('shoppyglobe_theme', themeToApply);
  }, [preferences.theme, currentTheme]);

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      if (user) {
        const savedSettings = localStorage.getItem(`shoppyglobe_user_settings_${user.id}`);
        const settings = savedSettings ? JSON.parse(savedSettings) : {};
        localStorage.setItem(
          `shoppyglobe_user_settings_${user.id}`,
          JSON.stringify({ ...settings, preferences: updated })
        );
      }
      return updated;
    });
  };

  const formatCurrency = (amount: number) => {
    const formatter = currencyFormatters[preferences.currency] || currencyFormatters.USD;
    return formatter.format(amount);
  };

  const translate = (key: string) => {
    return translations[preferences.language]?.[key] || translations.en[key] || key;
  };

  return (
    <PreferencesContext.Provider value={{ 
      preferences, 
      updatePreferences, 
      formatCurrency, 
      translate,
      currentTheme 
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}; 