import React from 'react';
import { X, Package, Truck, CheckCircle } from 'lucide-react';

interface OrderDetailsProps {
  order: {
    id: number;
    date: string;
    status: string;
    total: number;
    items: OrderItem[];
    shippingAddress: Address;
    paymentMethod: PaymentInfo;
    trackingNumber?: string;
  };
  onClose: () => void;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardType: string;
  lastFourDigits: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="text-green-500" />;
      case 'In Transit':
        return <Truck className="text-blue-500" />;
      default:
        return <Package className="text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
            {getStatusIcon(order.status)}
            <div>
              <p className="font-medium">{order.status}</p>
              <p className="text-sm text-gray-500">
                Order placed on {new Date(order.date).toLocaleDateString()}
              </p>
              {order.trackingNumber && (
                <p className="text-sm text-gray-500">
                  Tracking Number: {order.trackingNumber}
                </p>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-medium mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <p className="text-lg font-bold">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-medium mb-2">Payment Method</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>
                {order.paymentMethod.cardType} ending in{' '}
                {order.paymentMethod.lastFourDigits}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 