import React from "react";
// import RestaurantSidebar from "../components/Sidebar/RestaurantSidebar";
 
import { Outlet } from "react-router-dom";
 
import ResturentSidebar from "../Components/sidebar/ResturentSidebar";
import Topbar from "../Components/shared/Topbar/Topbar";

const RestaurantLayout = () => {
  return (
    <div className="flex">
      <ResturentSidebar />
      <div className="flex-1">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default RestaurantLayout;
