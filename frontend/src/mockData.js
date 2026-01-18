// Mock data for Swiggy clone

export const restaurants = [
  {
    id: 1,
    name: "Pizza Hut",
    cuisine: "Pizzas, Italian, Fast Food",
    rating: 4.2,
    deliveryTime: "30-35 mins",
    costForTwo: 350,
    offer: "50% OFF up to ₹100",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    distance: "2.5 km",
    isOpen: true
  },
  {
    id: 2,
    name: "Burger King",
    cuisine: "Burgers, American, Fast Food",
    rating: 4.3,
    deliveryTime: "25-30 mins",
    costForTwo: 400,
    offer: "₹125 OFF above ₹349",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    distance: "1.8 km",
    isOpen: true
  },
  {
    id: 3,
    name: "Chinese Wok",
    cuisine: "Chinese, Asian, Tibetan",
    rating: 4.1,
    deliveryTime: "35-40 mins",
    costForTwo: 300,
    offer: "40% OFF up to ₹80",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&q=80",
    distance: "3.2 km",
    isOpen: true
  },
  {
    id: 4,
    name: "Biryani Blues",
    cuisine: "Biryani, North Indian, Mughlai",
    rating: 4.4,
    deliveryTime: "40-45 mins",
    costForTwo: 450,
    offer: "Free delivery",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80",
    distance: "4.1 km",
    isOpen: true
  },
  {
    id: 5,
    name: "Subway",
    cuisine: "Healthy Food, Salads, Sandwiches",
    rating: 4.0,
    deliveryTime: "20-25 mins",
    costForTwo: 250,
    offer: "20% OFF up to ₹50",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80",
    distance: "1.5 km",
    isOpen: true
  },
  {
    id: 6,
    name: "Domino's Pizza",
    cuisine: "Pizzas, Italian, Pasta",
    rating: 4.3,
    deliveryTime: "30-35 mins",
    costForTwo: 400,
    offer: "60% OFF up to ₹120",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
    distance: "2.8 km",
    isOpen: true
  },
  {
    id: 7,
    name: "KFC",
    cuisine: "Burgers, Fast Food, American",
    rating: 4.2,
    deliveryTime: "25-30 mins",
    costForTwo: 450,
    offer: "₹100 OFF above ₹299",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
    distance: "2.2 km",
    isOpen: true
  },
  {
    id: 8,
    name: "Haldiram's",
    cuisine: "North Indian, South Indian, Sweets",
    rating: 4.5,
    deliveryTime: "35-40 mins",
    costForTwo: 350,
    offer: "Free delivery",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80",
    distance: "3.5 km",
    isOpen: true
  }
];

export const foodCategories = [
  { id: 1, name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80" },
  { id: 2, name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80" },
  { id: 3, name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80" },
  { id: 4, name: "Chinese", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&q=80" },
  { id: 5, name: "Rolls", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&q=80" },
  { id: 6, name: "Salad", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80" },
  { id: 7, name: "Desserts", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&q=80" },
  { id: 8, name: "Sandwich", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&q=80" }
];

export const menuItems = {
  1: [
    {
      id: 101,
      name: "Margherita Pizza",
      description: "Classic cheese pizza with tomato sauce and fresh mozzarella",
      price: 299,
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
      category: "Pizza",
      isVeg: true,
      rating: 4.3
    },
    {
      id: 102,
      name: "Pepperoni Pizza",
      description: "Loaded with pepperoni and extra cheese",
      price: 399,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
      category: "Pizza",
      isVeg: false,
      rating: 4.5
    },
    {
      id: 103,
      name: "Garlic Bread",
      description: "Crispy garlic bread with herbs",
      price: 129,
      image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=400&q=80",
      category: "Sides",
      isVeg: true,
      rating: 4.1
    }
  ],
  2: [
    {
      id: 201,
      name: "Whopper",
      description: "Flame-grilled beef patty with fresh vegetables",
      price: 189,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      category: "Burgers",
      isVeg: false,
      rating: 4.4
    },
    {
      id: 202,
      name: "Veg Whopper",
      description: "Crispy veg patty with fresh vegetables",
      price: 159,
      image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80",
      category: "Burgers",
      isVeg: true,
      rating: 4.2
    },
    {
      id: 203,
      name: "French Fries",
      description: "Crispy golden fries",
      price: 99,
      image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&q=80",
      category: "Sides",
      isVeg: true,
      rating: 4.3
    }
  ]
};

export const offers = [
  {
    id: 1,
    title: "50% OFF",
    description: "Use code SWIGGY50",
    terms: "Valid on orders above ₹299"
  },
  {
    id: 2,
    title: "Free Delivery",
    description: "Use code FREEDEL",
    terms: "Valid on orders above ₹199"
  },
  {
    id: 3,
    title: "₹100 OFF",
    description: "Use code FLAT100",
    terms: "Valid on orders above ₹499"
  }
];

export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 9876543210",
  addresses: [
    {
      id: 1,
      type: "Home",
      address: "123, MG Road, Bangalore, Karnataka - 560001",
      landmark: "Near City Mall"
    },
    {
      id: 2,
      type: "Work",
      address: "456, Tech Park, Whitefield, Bangalore, Karnataka - 560066",
      landmark: "Opposite Metro Station"
    }
  ],
  orders: [
    {
      id: "ORD123456",
      restaurant: "Pizza Hut",
      items: 3,
      total: 599,
      status: "delivered",
      date: "2025-01-15"
    },
    {
      id: "ORD123457",
      restaurant: "Burger King",
      items: 2,
      total: 349,
      status: "delivered",
      date: "2025-01-14"
    }
  ]
};