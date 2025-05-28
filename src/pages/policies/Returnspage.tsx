import React from 'react';
import { RotateCcw, Package, Clock, CreditCard } from 'lucide-react';

const ReturnsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns & Refunds Policy</h1>
        
        <div className="prose prose-lg">
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <RotateCcw className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Return Policy</h2>
            </div>
            <p>We want you to be completely satisfied with your purchase. If you're not happy with your order, we accept returns within 30 days of delivery for a full refund or exchange.</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mt-4">
              <h3 className="font-medium mb-2">Conditions for Returns:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Items must be unused and in original condition</li>
                <li>Original packaging must be intact</li>
                <li>All tags and labels must be attached</li>
                <li>Proof of purchase is required</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Package className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Return Process</h2>
            </div>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Initiate Return:</strong>
                <p>Log into your account and select the order you wish to return. Follow the prompts to generate a return label.</p>
              </li>
              <li>
                <strong>Package Your Return:</strong>
                <p>Carefully pack the item(s) in their original packaging or a suitable alternative. Include all accessories and documentation.</p>
              </li>
              <li>
                <strong>Ship Your Return:</strong>
                <p>Attach the return label to your package and drop it off at any authorized shipping location.</p>
              </li>
              <li>
                <strong>Track Your Return:</strong>
                <p>Use the tracking number provided to monitor your return's progress.</p>
              </li>
            </ol>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Processing Time</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>Returns are typically processed within 3-5 business days of receipt</li>
              <li>Refunds are issued to the original payment method</li>
              <li>You will receive an email confirmation once your return is processed</li>
            </ul>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <CreditCard className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Refunds</h2>
            </div>
            <p>Once your return is approved, we will initiate a refund to your original payment method:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Credit Card refunds: 5-7 business days</li>
              <li>PayPal refunds: 2-3 business days</li>
              <li>Store credit: Immediate upon return approval</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Non-Returnable Items</h2>
            <p>The following items cannot be returned:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Personal care items</li>
              <li>Intimate apparel</li>
              <li>Customized products</li>
              <li>Digital downloads</li>
              <li>Gift cards</li>
            </ul>
          
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p>If you have any questions about our return policy or need assistance with a return, please contact our customer service team:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email: returns@shoppyglobe.com</li>
              <li>Phone: 1-800-RETURNS (1-800-738-8767)</li>
              <li>Hours: Monday-Friday, 9 AM - 5 PM EST</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;