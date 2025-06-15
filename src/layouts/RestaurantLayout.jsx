import React from "react";
// import RestaurantSidebar from "../components/Sidebar/RestaurantSidebar";
 
import { Outlet } from "react-router-dom";
import Topbar from "../Components/Topbar/Topbar";

const RestaurantLayout = () => {
  return (
    <div className="flex">
      {/* <RestaurantSidebar /> */}
      <div className="flex-1">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default RestaurantLayout;
