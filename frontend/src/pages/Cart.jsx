import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { offers } from '../mockData';
import LoginModal from '../components/LoginModal';

const Cart = () => {
  const { cartItems, restaurant, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [appliedOffer, setAppliedOffer] = useState(null);

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 200 ? 0 : 40;
  const gst = Math.round(subtotal * 0.05);
  const discount = appliedOffer ? Math.min(appliedOffer.maxDiscount || 100, Math.round(subtotal * 0.5)) : 0;
  const total = subtotal + deliveryFee + gst - discount;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    navigate('/checkout');
  };

  const applyOffer = (offer) => {
    if (subtotal >= 299) {
      setAppliedOffer({ ...offer, maxDiscount: 100 });
    } else {
      alert('Minimum order value should be ₹299');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1547496614-3494f11d36d9?w=400&q=80"
            alt="Empty cart"
            className="w-64 h-64 mx-auto mb-6 opacity-50"
          />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add items to get started</p>
          <Button
            onClick={() => navigate('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Restaurant Info */}
            {restaurant && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                  </div>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                </div>
              </Card>
            )}

            {/* Cart Items List */}
            <Card className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`w-4 h-4 border-2 mt-1 ${
                        item.isVeg ? 'border-green-600' : 'border-red-600'
                      }`}>
                        <div className={`w-2 h-2 rounded-full m-0.5 ${
                          item.isVeg ? 'bg-green-600' : 'bg-red-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                      <div className="flex items-center gap-3 bg-white border-2 border-orange-500 rounded-lg px-3 py-1">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-orange-500 hover:text-orange-600"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-orange-500 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item, restaurant)}
                          className="text-orange-500 hover:text-orange-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            {/* Offers */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-orange-500" />
                Available Offers
              </h3>
              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:border-orange-500 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-orange-500">{offer.title}</p>
                      <p className="text-sm text-gray-600">{offer.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{offer.terms}</p>
                    </div>
                    <Button
                      onClick={() => applyOffer(offer)}
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-50"
                      disabled={appliedOffer?.id === offer.id}
                    >
                      {appliedOffer?.id === offer.id ? 'Applied' : 'Apply'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Bill Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h3 className="font-bold text-xl mb-4">Bill Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item Total</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (5%)</span>
                  <span className="font-semibold">₹{gst}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-lg"
              >
                Proceed to Checkout
              </Button>
              {!isAuthenticated && (
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Please login to continue
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default Cart;