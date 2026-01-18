import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/input';
import { restaurants, menuItems } from '../mockData';
import RestaurantCard from '../components/RestaurantCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Search restaurants
  const searchRestaurants = restaurants.filter((restaurant) => {
    const query = searchQuery.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.cuisine.toLowerCase().includes(query)
    );
  });

  // Search dishes across all restaurants
  const searchDishes = [];
  Object.keys(menuItems).forEach((restaurantId) => {
    const restaurant = restaurants.find((r) => r.id === parseInt(restaurantId));
    menuItems[restaurantId].forEach((dish) => {
      if (dish.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchDishes.push({
          ...dish,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
        });
      }
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for restaurants and food"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full text-lg"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!searchQuery ? (
          <div className="text-center py-12">
            <Search className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold mb-2">Search for restaurants and food</h2>
            <p className="text-gray-600">Start typing to see results</p>
          </div>
        ) : (
          <Tabs defaultValue="restaurants" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="restaurants" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Restaurants ({searchRestaurants.length})
              </TabsTrigger>
              <TabsTrigger value="dishes" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Dishes ({searchDishes.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="restaurants">
              {searchRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No restaurants found for "{searchQuery}"</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="dishes">
              {searchDishes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchDishes.map((dish) => (
                    <div
                      key={`${dish.restaurantId}-${dish.id}`}
                      onClick={() => navigate(`/restaurant/${dish.restaurantId}`)}
                      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-4 h-4 border-2 ${
                            dish.isVeg ? 'border-green-600' : 'border-red-600'
                          }`}>
                            <div className={`w-2 h-2 rounded-full m-0.5 ${
                              dish.isVeg ? 'bg-green-600' : 'bg-red-600'
                            }`} />
                          </div>
                          <h3 className="font-bold text-lg">{dish.name}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{dish.description}</p>
                        <p className="font-bold text-lg mb-2">₹{dish.price}</p>
                        <p className="text-orange-500 text-sm font-medium">
                          Available at {dish.restaurantName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No dishes found for "{searchQuery}"</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default SearchPage;