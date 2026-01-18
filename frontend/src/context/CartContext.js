import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('swiggy_cart');
    const savedRestaurant = localStorage.getItem('swiggy_cart_restaurant');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedRestaurant) {
      setRestaurant(JSON.parse(savedRestaurant));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('swiggy_cart', JSON.stringify(cartItems));
    if (restaurant) {
      localStorage.setItem('swiggy_cart_restaurant', JSON.stringify(restaurant));
    }
  }, [cartItems, restaurant]);

  const addToCart = (item, restaurantInfo) => {
    // Check if adding from different restaurant
    if (restaurant && restaurant.id !== restaurantInfo.id) {
      const confirmChange = window.confirm(
        `Your cart contains items from ${restaurant.name}. Do you want to clear the cart and add items from ${restaurantInfo.name}?`
      );
      if (!confirmChange) return false;
      setCartItems([]);
    }

    setRestaurant(restaurantInfo);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    return true;
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      const newItems = prevItems.filter((i) => i.id !== itemId);
      if (newItems.length === 0) {
        setRestaurant(null);
        localStorage.removeItem('swiggy_cart_restaurant');
      }
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurant(null);
    localStorage.removeItem('swiggy_cart');
    localStorage.removeItem('swiggy_cart_restaurant');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        restaurant,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};