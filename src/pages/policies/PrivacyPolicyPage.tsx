import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600">Last updated: March 15, 2025</p>
          
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
            </div>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Name and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information</li>
              <li>Order history</li>
              <li>Communication preferences</li>
            </ul>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
            </div>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Process your orders and payments</li>
              <li>Communicate with you about your orders</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Detect and prevent fraud</li>
            </ul>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Information Sharing</h2>
            </div>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Payment processors</li>
              <li>Shipping partners</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Your Rights</h2>
            </div>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Security Measures</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>SSL encryption for data transmission</li>
              <li>Secure data storage</li>
              <li>Regular security assessments</li>
              <li>Employee training on data protection</li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>If you have any questions about our privacy policy or practices, please contact our Data Protection Officer:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email: privacy@shoppyglobe.com</li>
              <li>Phone: 1-800-PRIVACY (1-800-774-8223)</li>
              <li>Address: 123 Shopping Avenue, Retail District, NY 10001</li>
            </ul>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              This privacy policy is subject to change. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;