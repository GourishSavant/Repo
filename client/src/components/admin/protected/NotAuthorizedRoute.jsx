import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";
const NotAuthorizedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Check authentication state
  const location = useLocation(); // Get current location
  if (isAuthenticated) {
    // Redirect authenticated users back to the page they were on
    return <Navigate to={location.state?.from?.pathname || "/admin/dashboard"} />;
  }
  return children; // Render login page for unauthenticated users
};
export default NotAuthorizedRoute;