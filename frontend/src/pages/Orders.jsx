import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get orders from localStorage
  const orders = JSON.parse(localStorage.getItem('swiggy_orders') || '[]');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'preparing':
      case 'delivering':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'preparing':
        return 'Preparing';
      case 'delivering':
        return 'Out for Delivery';
      default:
        return 'Order Placed';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'preparing':
      case 'delivering':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start ordering to see your order history</p>
            <Button
              onClick={() => navigate('/')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Browse Restaurants
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{order.restaurant}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                        getStatusColor(order.status)
                      }`}>
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {order.items} items • ₹{order.total}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {order.address && (
                      <div className="flex items-start gap-2 mt-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{order.address.address}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {order.status !== 'delivered' && (
                      <Button
                        onClick={() => navigate(`/order-tracking/${order.id}`)}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Track Order
                      </Button>
                    )}
                    <Button
                      onClick={() => navigate('/')}
                      variant="outline"
                    >
                      Reorder
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;