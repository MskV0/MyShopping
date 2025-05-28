import React, { useState, useEffect } from 'react';
import { Save, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../../context/PreferencesContext';

const getSettingsKey = (userId: string) => `shoppyglobe_user_settings_${userId}`;

interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    promotions: boolean;
    orderUpdates: boolean;
    newProducts: boolean;
  };
}

const defaultSettings: UserSettings = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  avatar: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  notifications: {
    email: true,
    sms: false,
    promotions: true,
    orderUpdates: true,
    newProducts: false,
  },
};

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (!user) return defaultSettings;

    // Try to get existing settings first
    const savedSettings = localStorage.getItem(getSettingsKey(user.id));
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      // Ensure all required objects exist
      return {
        ...defaultSettings,
        ...parsed,
        address: { ...defaultSettings.address, ...parsed.address },
        notifications: { ...defaultSettings.notifications, ...parsed.notifications }
      };
    }

    // If no settings exist, initialize with user data from registration
    const [firstName = '', lastName = ''] = user.name?.split(' ') || [];
    return {
      ...defaultSettings,
      firstName,
      lastName,
      email: user.email || '',
    };
  });

  // Update settings when user changes
  useEffect(() => {
    if (user) {
      const [firstName = '', lastName = ''] = user.name?.split(' ') || [];
      setSettings(prev => ({
        ...prev,
        firstName,
        lastName,
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof UserSettings],
          [field]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const validateSettings = () => {
    if (!settings.firstName.trim()) {
      toast.error('First name is required');
      return false;
    }
    if (!settings.lastName.trim()) {
      toast.error('Last name is required');
      return false;
    }
    if (!settings.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSettings()) {
      return;
    }

    setIsLoading(true);
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Save to localStorage with user-specific key
      localStorage.setItem(getSettingsKey(user.id), JSON.stringify(settings));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      toast.error('Please login to access settings');
      navigate('/login');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
        Account Settings
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Section */}
        <section className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300 border border-gray-100 dark:border-dark-border">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-dark-text">Profile</h2>
          <div className="flex items-center mb-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-dark-border flex items-center justify-center overflow-hidden">
                {settings.avatar ? (
                  <img 
                    src={settings.avatar} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Camera className="h-8 w-8 text-gray-400 dark:text-dark-text-secondary" />
                )}
              </div>
              <input
                type="url"
                name="avatar"
                value={settings.avatar}
                onChange={handleInputChange}
                placeholder="Enter avatar URL"
                className="mt-2 w-full text-sm px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={settings.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={settings.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300 border border-gray-100 dark:border-dark-border">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-dark-text">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="address.street"
                value={settings.address.street}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                City
              </label>
              <input
                type="text"
                name="address.city"
                value={settings.address.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                State
              </label>
              <input
                type="text"
                name="address.state"
                value={settings.address.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                name="address.zipCode"
                value={settings.address.zipCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Country
              </label>
              <input
                type="text"
                name="address.country"
                value={settings.address.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300 border border-gray-100 dark:border-dark-border">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-dark-text">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notifications.email"
                checked={settings.notifications.email}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-dark-border rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-dark-text">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notifications.sms"
                checked={settings.notifications.sms}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-dark-border rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-dark-text">
                SMS Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notifications.promotions"
                checked={settings.notifications.promotions}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-dark-border rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-dark-text">
                Promotional Offers
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notifications.orderUpdates"
                checked={settings.notifications.orderUpdates}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-dark-border rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-dark-text">
                Order Updates
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notifications.newProducts"
                checked={settings.notifications.newProducts}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-dark-border rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-dark-text">
                New Product Alerts
              </label>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transform hover:scale-105 transition-all duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage; 