import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddPaymentMethodFormProps {
  onClose: () => void;
  onAdd: (paymentMethod: {
    id: string;
    cardNumber: string;
    expiryDate: string;
    cardHolder: string;
    isDefault: boolean;
  }) => void;
}

const AddPaymentMethodForm: React.FC<AddPaymentMethodFormProps> = ({ onClose, onAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    isDefault: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19); // Limit to 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substring(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue,
    }));
  };

  const validateForm = () => {
    const { cardNumber, expiryDate, cvv, cardHolder } = formData;
    
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid 16-digit card number');
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      toast.error('Please enter a valid expiry date (MM/YY)');
      return false;
    }

    const [month, year] = expiryDate.split('/');
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (
      parseInt(year) < currentYear ||
      (parseInt(year) === currentYear && parseInt(month) < currentMonth) ||
      parseInt(month) > 12
    ) {
      toast.error('Card has expired or invalid expiry date');
      return false;
    }

    if (cvv.length !== 3) {
      toast.error('Please enter a valid 3-digit CVV');
      return false;
    }

    if (!cardHolder.trim()) {
      toast.error('Please enter the cardholder name');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a masked version of the card number
      const lastFourDigits = formData.cardNumber.slice(-4);
      const maskedNumber = `**** **** **** ${lastFourDigits}`;

      onAdd({
        id: Date.now().toString(),
        cardNumber: maskedNumber,
        expiryDate: formData.expiryDate,
        cardHolder: formData.cardHolder,
        isDefault: formData.isDefault,
      });

      toast.success('Payment method added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding payment method:', error);
      toast.error('Failed to add payment method. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Add Payment Method</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="default-card"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="default-card" className="ml-2 text-sm text-gray-700">
              Set as default payment method
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
          >
            {isLoading ? 'Adding...' : 'Add Payment Method'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentMethodForm; 