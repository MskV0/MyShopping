import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentMethod {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
}

const PaymentMethodsPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      cardNumber: '**** **** **** 4242',
      cardHolder: 'John Doe',
      expiryDate: '12/24',
      isDefault: true,
    },
  ]);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.cardNumber.length < 19) {
      toast.error('Please enter a valid card number');
      return;
    }

    if (formData.cardHolder.trim().length < 3) {
      toast.error('Please enter a valid cardholder name');
      return;
    }

    if (formData.expiryDate.length < 5) {
      toast.error('Please enter a valid expiry date');
      return;
    }

    if (formData.cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return;
    }

    // Add new payment method
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      cardNumber: '**** **** **** ' + formData.cardNumber.slice(-4),
      cardHolder: formData.cardHolder,
      expiryDate: formData.expiryDate,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods((prev) => [...prev, newPaymentMethod]);
    setShowAddForm(false);
    setFormData({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    });
    toast.success('Payment method added successfully');
  };

  const handleDelete = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
    toast.success('Payment method removed');
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    toast.success('Default payment method updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus size={20} />
            <span>Add New Card</span>
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Card</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Card
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <CreditCard className="text-gray-400" size={24} />
              <div>
                <p className="font-medium text-gray-900">{method.cardNumber}</p>
                <p className="text-sm text-gray-500">
                  {method.cardHolder} • Expires {method.expiryDate}
                </p>
              </div>
              {method.isDefault && (
                <span className="px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full">
                  Default
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {!method.isDefault && (
                <button
                  onClick={() => handleSetDefault(method.id)}
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  Set as Default
                </button>
              )}
              <button
                onClick={() => handleDelete(method.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodsPage; 