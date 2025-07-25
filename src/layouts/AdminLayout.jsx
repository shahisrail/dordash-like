import React from "react";

import { Outlet } from "react-router-dom";
 
import Adminsidebar from "../Components/sidebar/adminsidebar";
import Topbar from "../Components/shared/Topbar/Topbar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Adminsidebar />
      <div className="flex-1">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
