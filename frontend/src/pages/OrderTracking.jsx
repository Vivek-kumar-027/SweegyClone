import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, CheckCircle2, Package, Bike, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Get order from localStorage
  const orders = JSON.parse(localStorage.getItem('swiggy_orders') || '[]');
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Order Placed', icon: CheckCircle2, status: 'completed' },
    { id: 2, name: 'Preparing', icon: Package, status: order.status === 'preparing' ? 'active' : 'completed' },
    { id: 3, name: 'Out for Delivery', icon: Bike, status: order.status === 'delivering' ? 'active' : order.status === 'delivered' ? 'completed' : 'pending' },
    { id: 4, name: 'Delivered', icon: Home, status: order.status === 'delivered' ? 'completed' : 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Order ID: {orderId}</p>
        </div>

        {/* Order Status Timeline */}
        <Card className="p-8 mb-6">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200">
              <div
                className="h-full bg-orange-500 transition-all duration-500"
                style={{
                  width: order.status === 'preparing' ? '33%' : order.status === 'delivering' ? '66%' : order.status === 'delivered' ? '100%' : '0%'
                }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                        step.status === 'completed'
                          ? 'bg-orange-500 text-white'
                          : step.status === 'active'
                          ? 'bg-orange-100 text-orange-500 ring-4 ring-orange-200'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <p className={`text-sm font-medium text-center ${
                      step.status !== 'pending' ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-gray-600 mb-2">Estimated Delivery Time</p>
            <p className="text-2xl font-bold text-orange-500">30-35 mins</p>
          </div>
        </Card>

        {/* Order Details */}
        <Card className="p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">Order Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Restaurant</span>
              <span className="font-semibold">{order.restaurant}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Items</span>
              <span className="font-semibold">{order.items} items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold">₹{order.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-semibold capitalize">{order.paymentMethod}</span>
            </div>
          </div>
        </Card>

        {/* Delivery Address */}
        <Card className="p-6 mb-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            Delivery Address
          </h3>
          <div>
            <p className="font-semibold mb-1">{order.address.type}</p>
            <p className="text-gray-600">{order.address.address}</p>
            {order.address.landmark && (
              <p className="text-gray-500 text-sm mt-1">Landmark: {order.address.landmark}</p>
            )}
          </div>
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex-1"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => navigate('/orders')}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            View All Orders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;