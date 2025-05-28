import React from 'react';
import { FileText, AlertTriangle, Scale, Shield } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600">Last updated: March 15, 2025</p>
          
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
            </div>
            <p>By accessing or using ShoppyGlobe, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our service.</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>"Service"</strong> refers to the ShoppyGlobe website and all related services</li>
              <li><strong>"User"</strong> refers to any individual accessing or using the Service</li>
              <li><strong>"Products"</strong> refers to all items available for purchase through the Service</li>
              <li><strong>"Content"</strong> refers to text, images, videos, and other materials on the Service</li>
            </ul>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Scale className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">User Responsibilities</h2>
            </div>
            <p>As a user of our service, you agree to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Not share your account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in any fraudulent activities</li>
            </ul>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            </div>
            <p>The Service and its original content, features, and functionality are owned by ShoppyGlobe and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
            </div>
            <p>ShoppyGlobe shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Prohibited Activities</h2>
            <p>Users are prohibited from:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Using the service for any illegal purpose</li>
              <li>Attempting to gain unauthorized access</li>
              <li>Interfering with the proper functioning of the Service</li>
              <li>Engaging in any automated use of the system</li>
              <li>Attempting to impersonate another user or person</li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions.</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email: legal@shoppyglobe.com</li>
              <li>Phone: 1-800-LEGAL (1-800-534-2567)</li>
              <li>Address: 123 Shopping Avenue, Retail District, NY 10001</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;