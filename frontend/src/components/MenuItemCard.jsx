import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';

const MenuItemCard = ({ item, restaurant }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    const success = addToCart(item, restaurant);
    if (success) {
      toast({
        title: 'Added to cart',
        description: `${item.name} added to your cart`,
      });
    }
  };

  return (
    <div className="flex gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-start gap-2">
          <div className={`w-4 h-4 border-2 mt-1 ${
            item.isVeg ? 'border-green-600' : 'border-red-600'
          }`}>
            <div className={`w-2 h-2 rounded-full m-0.5 ${
              item.isVeg ? 'bg-green-600' : 'bg-red-600'
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <div className="flex items-center gap-4">
              <p className="font-bold text-lg">₹{item.price}</p>
              {item.rating && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span>★</span>
                  <span>{item.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}
        {quantity > 0 ? (
          <div className="flex items-center gap-3 bg-white border-2 border-orange-500 rounded-lg px-3 py-2">
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-semibold text-orange-500 w-6 text-center">{quantity}</span>
            <button
              onClick={handleAddToCart}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-50 font-semibold"
          >
            ADD
          </Button>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;