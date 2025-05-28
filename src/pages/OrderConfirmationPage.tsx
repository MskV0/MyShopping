import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
  
  // Calculate estimated delivery date (7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="mt-2 text-lg text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium text-gray-900">{orderNumber}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-900">Credit Card (****1234)</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-gray-600">Shipping Method:</span>
                <span className="font-medium text-gray-900">Standard Shipping</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
            
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="mt-1 text-gray-600">123 Main Street</p>
              <p className="text-gray-600">Apt 4B</p>
              <p className="text-gray-600">New York, NY 10001</p>
              <p className="text-gray-600">United States</p>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-medium text-gray-900">Order Timeline</h2>
            
            <div className="mt-4 relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="relative flex items-start mb-6">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center z-10">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">Order Confirmed</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              <div className="relative flex items-start mb-6">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center z-10">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">Processing Order</h3>
                  <p className="mt-1 text-sm text-gray-500">Your order is being prepared</p>
                </div>
              </div>
              
              <div className="relative flex items-start mb-6">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center z-10">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">Shipping</h3>
                  <p className="mt-1 text-sm text-gray-500">Your order will be shipped soon</p>
                </div>
              </div>
              
              <div className="relative flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center z-10">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">Estimated Delivery</h3>
                  <p className="mt-1 text-sm text-gray-500">{formattedDeliveryDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto mb-4 sm:mb-0"
            >
              Continue Shopping
            </Link>
            
            <Link
              to="/account/orders"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;