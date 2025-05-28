import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const WishlistPage: React.FC = () => {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleAddToCart = (item: any) => {
    addToCart(item);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-4 flex space-x-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {item.title}
                </h3>
                <p className="text-lg font-bold text-indigo-600 mt-1">
                  ${item.price.toFixed(2)}
                </p>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart size={18} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Save items you love to your wishlist.</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 