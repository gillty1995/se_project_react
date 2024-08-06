import React from "react";
import { Route, Navigate } from "react-router-dom";

// Mock function to check if user is authenticated
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return localStorage.getItem("authToken"); // Example: check if auth token exists
};

const ProtectedRoute = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Navigate to="/" />}
    />
  );
};

export default ProtectedRoute;
