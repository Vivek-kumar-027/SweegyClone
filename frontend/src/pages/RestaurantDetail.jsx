import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Search } from 'lucide-react';
import { restaurants, menuItems } from '../mockData';
import MenuItemCard from '../components/MenuItemCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useCart } from '../context/CartContext';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  const menu = menuItems[id] || [];

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
          <Button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  // Get unique categories
  const categories = ['all', ...new Set(menu.map((item) => item.category))];

  // Filter menu items
  let filteredMenu = menu;
  if (selectedCategory !== 'all') {
    filteredMenu = filteredMenu.filter((item) => item.category === selectedCategory);
  }
  if (searchQuery) {
    filteredMenu = filteredMenu.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full md:w-48 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-green-600 text-green-600" />
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.distance}</span>
                </div>
                <div className="text-gray-600">
                  ₹{restaurant.costForTwo} for two
                </div>
              </div>
              {restaurant.offer && (
                <div className="mt-4 inline-block bg-orange-50 text-orange-600 px-4 py-2 rounded-lg font-semibold">
                  {restaurant.offer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for dishes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
              <div className="flex gap-4 p-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu List */}
            <div className="bg-white rounded-lg shadow-sm">
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item) => (
                  <MenuItemCard key={item.id} item={item} restaurant={restaurant} />
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No items found
                </div>
              )}
            </div>
          </div>

          {/* Cart Summary - Sticky */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <Button
                  onClick={() => navigate('/cart')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;