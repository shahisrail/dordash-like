import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../Components/Topbar/Topbar";

const Main = () => {
  return (
    <div>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="flex-1">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
