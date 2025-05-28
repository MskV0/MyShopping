import React from 'react';
import { User, Package, Heart, CreditCard, Settings, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                <p className="text-gray-600">john.doe@example.com</p>
                <p className="text-sm text-gray-500">Member since January 2025</p>
              </div>
            </div>
          </div>

          {/* Profile Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            <nav className="p-6 space-y-4">
              <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md">
                <User className="mr-3 h-5 w-5" />
                Personal Information
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                <Package className="mr-3 h-5 w-5" />
                Orders
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                <Heart className="mr-3 h-5 w-5" />
                Wishlist
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                <CreditCard className="mr-3 h-5 w-5" />
                Payment Methods
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </nav>

            {/* Profile Content */}
            <div className="col-span-2 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue="John"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue="Doe"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="john.doe@example.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    defaultValue="123 Main St, Apt 4B, New York, NY 10001"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;