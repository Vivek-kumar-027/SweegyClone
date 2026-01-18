import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Wallet, Banknote, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { toast } from '../hooks/use-toast';

const Checkout = () => {
  const { cartItems, restaurant, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses?.[0]?.id || null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 200 ? 0 : 40;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + gst;

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast({
        title: 'Address Required',
        description: 'Please select a delivery address',
        variant: 'destructive',
      });
      return;
    }

    // Simulate order placement
    const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
    toast({
      title: 'Order Placed Successfully!',
      description: `Your order ID is ${orderId}`,
    });

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('swiggy_orders') || '[]');
    orders.unshift({
      id: orderId,
      restaurant: restaurant.name,
      items: cartItems.length,
      total: total,
      status: 'preparing',
      date: new Date().toISOString(),
      address: user.addresses.find(a => a.id === selectedAddress),
      paymentMethod,
    });
    localStorage.setItem('swiggy_orders', JSON.stringify(orders));

    clearCart();
    setTimeout(() => {
      navigate(`/order-tracking/${orderId}`);
    }, 1500);
  };

  if (!user || cartItems.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Delivery Address
              </h2>
              <RadioGroup value={selectedAddress?.toString()} onValueChange={(val) => setSelectedAddress(parseInt(val))}>
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === address.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} />
                    <Label htmlFor={`address-${address.id}`} className="flex-1 cursor-pointer">
                      <div className="font-semibold mb-1">{address.type}</div>
                      <div className="text-gray-600 text-sm">{address.address}</div>
                      {address.landmark && (
                        <div className="text-gray-500 text-xs mt-1">Landmark: {address.landmark}</div>
                      )}
                    </Label>
                    {selectedAddress === address.id && (
                      <Check className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                ))}
              </RadioGroup>
              <Button
                variant="outline"
                className="w-full mt-4 border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                + Add New Address
              </Button>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-500" />
                Payment Method
              </h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <CreditCard className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Credit / Debit Card</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard, RuPay, etc.</div>
                    </div>
                  </Label>
                </div>

                <div
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <Wallet className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">UPI</div>
                      <div className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</div>
                    </div>
                  </Label>
                </div>

                <div
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <Banknote className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h3 className="font-bold text-xl mb-4">Order Summary</h3>
              
              {/* Restaurant */}
              <div className="mb-4 pb-4 border-b">
                <p className="font-semibold">{restaurant.name}</p>
                <p className="text-sm text-gray-600">{cartItems.length} items</p>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-4 pb-4 border-b">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Bill Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Item Total</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (5%)</span>
                  <span className="font-semibold">₹{gst}</span>
                </div>
              </div>

              <hr className="my-4" />
              
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-lg"
              >
                Place Order
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;