import React from "react";

import { Outlet } from "react-router-dom";
import Topbar from "../Components/Topbar/Topbar";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* <AdminSidebar /> */}
      <div className="flex-1">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
