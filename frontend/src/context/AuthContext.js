import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('swiggy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, this would call backend API
    if (email && password) {
      const userData = { ...mockUser, email };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('swiggy_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (name, email, password, phone) => {
    // Mock signup - in real app, this would call backend API
    if (name && email && password && phone) {
      const userData = { ...mockUser, name, email, phone };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('swiggy_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Please fill all fields' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('swiggy_user');
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('swiggy_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};