import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation(); // Get current location
  if (!isAuthenticated) {
    // Redirect unauthenticated users to login and store the current page in state
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }
  return children; // Render the protected component if authenticated
};
export default ProtectedRoute;