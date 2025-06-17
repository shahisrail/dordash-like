// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/auth";  

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const user = getUserFromLocalStorage(); // get user from localStorage

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
