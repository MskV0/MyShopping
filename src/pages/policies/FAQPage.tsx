import React from 'react';

const FAQPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ordering</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">How do I place an order?</h3>
                <p className="mt-2 text-gray-600">Browse our products, add items to your cart, and proceed to checkout. Follow the steps to enter your shipping and payment information.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Can I modify or cancel my order?</h3>
                <p className="mt-2 text-gray-600">You can modify or cancel your order within 1 hour of placing it. Contact our customer service team for assistance.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">How long will shipping take?</h3>
                <p className="mt-2 text-gray-600">Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Do you ship internationally?</h3>
                <p className="mt-2 text-gray-600">Yes, we ship to most countries. International shipping times vary by location.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Returns & Refunds</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">What is your return policy?</h3>
                <p className="mt-2 text-gray-600">We offer a 30-day return policy for most items. Products must be unused and in original packaging.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">How long do refunds take?</h3>
                <p className="mt-2 text-gray-600">Refunds are processed within 5-7 business days after we receive your return.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">What payment methods do you accept?</h3>
                <p className="mt-2 text-gray-600">We accept all major credit cards, PayPal, and Apple Pay.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Is my payment information secure?</h3>
                <p className="mt-2 text-gray-600">Yes, we use industry-standard encryption to protect your payment information.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account & Security</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">How do I create an account?</h3>
                <p className="mt-2 text-gray-600">Click the "Sign Up" button and follow the registration process. You'll need to provide your email and create a password.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">What if I forgot my password?</h3>
                <p className="mt-2 text-gray-600">Use the "Forgot Password" link on the login page to reset your password via email.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;