import React from 'react';
import { Truck, Clock, Globe, Shield } from 'lucide-react';

const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
        
        <div className="prose prose-lg">
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Truck className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Shipping Methods</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-medium">Standard Shipping</h3>
                <p>3-5 business days - FREE for orders over $50</p>
                <p>$4.99 for orders under $50</p>
              </div>
              <div>
                <h3 className="font-medium">Express Shipping</h3>
                <p>1-2 business days - $9.99</p>
              </div>
              <div>
                <h3 className="font-medium">Next Day Delivery</h3>
                <p>Next business day - $14.99</p>
                <p>Available for orders placed before 2 PM EST</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Processing Time</h2>
            </div>
            <p>Orders are typically processed within 24 hours of being placed. Orders placed on weekends or holidays will be processed the next business day.</p>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">International Shipping</h2>
            </div>
            <p>We ship to most countries worldwide. International shipping rates and delivery times vary by location:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Canada: 5-7 business days</li>
              <li>Europe: 7-10 business days</li>
              <li>Asia: 10-14 business days</li>
              <li>Australia/New Zealand: 10-14 business days</li>
            </ul>
            <p className="mt-4">International customers are responsible for any customs duties, taxes, and import fees.</p>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Shipping Insurance</h2>
            </div>
            <p>All orders are automatically insured against loss or damage during transit. Additional insurance coverage is available at checkout for valuable items.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Important Notes</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Shipping times are estimates and may vary due to weather conditions or other circumstances.</li>
              <li>A signature may be required for deliveries over $200.</li>
              <li>We do not ship to P.O. boxes for orders containing certain items.</li>
              <li>Order tracking information will be provided via email once your order ships.</li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>If you have any questions about shipping or delivery, please contact our customer service team:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email: shipping@shoppyglobe.com</li>
              <li>Phone: 1-800-SHIPPING (1-800-744-77464)</li>
              <li>Hours: Monday-Friday, 9 AM - 5 PM EST</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;