import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { restaurants, foodCategories } from '../mockData';
import RestaurantCard from '../components/RestaurantCard';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Home = () => {
  const [categoryScroll, setCategoryScroll] = useState(0);
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const scrollCategories = (direction) => {
    const container = document.getElementById('category-scroll');
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Filter and sort restaurants
  let filteredRestaurants = [...restaurants];
  
  if (filterRating !== 'all') {
    const minRating = parseFloat(filterRating);
    filteredRestaurants = filteredRestaurants.filter((r) => r.rating >= minRating);
  }

  filteredRestaurants.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'deliveryTime') {
      const timeA = parseInt(a.deliveryTime.split('-')[0]);
      const timeB = parseInt(b.deliveryTime.split('-')[0]);
      return timeA - timeB;
    }
    if (sortBy === 'costForTwo') return a.costForTwo - b.costForTwo;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Order food from favourite restaurants near you.
            </h1>
            <p className="text-gray-600 text-lg">
              Get fresh food delivered to your doorstep
            </p>
          </div>
        </div>
      </div>

      {/* Food Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">What's on your mind?</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollCategories('left')}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollCategories('right')}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div
          id="category-scroll"
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {foodCategories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 cursor-pointer group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="max-w-7xl mx-auto" />

      {/* Restaurants Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Restaurants with online food delivery</h2>
          <div className="flex gap-4">
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4.0">4.0+</SelectItem>
                <SelectItem value="4.2">4.2+</SelectItem>
                <SelectItem value="4.5">4.5+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                <SelectItem value="costForTwo">Cost for Two</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;