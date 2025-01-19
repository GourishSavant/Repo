import React, { createContext, useContext, useState, useEffect } from "react";
// Create a context
const AuthContext = createContext();
// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  useEffect(() => {
    // Check for stored tokens on app load
    const accessToken = localStorage.getItem("accessToken");
    const storedUser = JSON.parse(localStorage.getItem("staff"));
    if (accessToken && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);
  const login = (userData) => {
    setUser(userData); // Update user data
    setIsAuthenticated(true); // Set authenticated
  };
  const logout = () => {
    setUser(null); // Clear user state
    setIsAuthenticated(false); // Reset authentication state
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("staff");
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};