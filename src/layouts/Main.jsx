import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../Components/shared/Topbar/Topbar";
import Footer from "../Components/Footer";
 

const Main = () => {
  return (
    <div>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="flex-1">
          <Topbar />
          <Outlet />
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Main;
