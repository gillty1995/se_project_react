import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

function ProtectedRoute({ element, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? element : <Navigate to="/profile" />;
}

export default ProtectedRoute;
