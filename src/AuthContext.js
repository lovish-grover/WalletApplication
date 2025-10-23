// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Or initial state from local storage/cookie

  const login = (userData) => {
    setUser(userData);
    // Store token/user data in local storage or cookie
  };

  const logout = () => {
    setUser(null);
    // Clear token/user data from local storage or cookie
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
