import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {restaurant.offer && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p className="text-white font-semibold text-sm">{restaurant.offer}</p>
          </div>
        )}
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Closed</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{restaurant.name}</h3>
        <p className="text-gray-500 text-sm mb-2 truncate">{restaurant.cuisine}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-green-600 text-green-600" />
            <span className="font-semibold">{restaurant.rating}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <span>₹{restaurant.costForTwo} for two</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-gray-500 text-xs mt-2">
          <MapPin className="w-3 h-3" />
          <span>{restaurant.distance}</span>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;