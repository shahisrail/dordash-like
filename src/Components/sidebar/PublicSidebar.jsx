// src/components/Sidebar/PublicSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const PublicSidebar = () => {
  return (
    <div className="w-60 bg-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Categories</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/">Restaurant</Link>
        </li>
        <li>
          <Link to="/">Grocery</Link>
        </li>
        <li>
          <Link to="/">Electronics</Link>
        </li>
        <li>
          <Link to="/">Books</Link>
        </li>
        <li>
          <Link to="/">Fashion</Link>
        </li>
      </ul>
    </div>
  );
};

export default PublicSidebar;
