// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const login = (username) => {
    const newUser = { username, favorites: [] };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleFavorite = (code) => {
    const updatedUser = {
      ...user,
      favorites: user.favorites.includes(code)
        ? user.favorites.filter((c) => c !== code)
        : [...user.favorites, code],
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, toggleFavorite }}>
      {children}
    </UserContext.Provider>
  );
};