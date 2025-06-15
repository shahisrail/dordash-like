// src/components/Topbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-between items-center p-4 bg-white border-b shadow-md">
      <input
        type="text"
        placeholder="Search anything..."
        className="border px-3 py-1 rounded w-1/2"
      />
      <div>
        {user ? (
          <Link to="/profile" className="ml-4 font-semibold">
            Profile
          </Link>
        ) : (
          <Link to="/login" className="ml-4 font-semibold">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
