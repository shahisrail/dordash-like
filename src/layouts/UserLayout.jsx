import React from "react";
// import RestaurantSidebar from "../components/Sidebar/RestaurantSidebar";

import { Outlet } from "react-router-dom";
 
import UserSidebar from "../Components/sidebar/UserSidebar";
import Topbar from "../Components/shared/Topbar/Topbar";

const UserLayout = () => {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
