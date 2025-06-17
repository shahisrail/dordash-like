// src/layouts/RoleBasedLayout.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import AdminLayout from "./AdminLayout";
import RestaurantLayout from "./RestaurantLayout";
import Main from "./Main";

const RoleBasedLayout = () => {
  const role = getUserRole();

  if (role === "admin") {
    return <AdminLayout />;
  } else if (role === "restaurant") {
    return <RestaurantLayout />;
  } else {
    return <Main />;
  }
};

export default RoleBasedLayout;
