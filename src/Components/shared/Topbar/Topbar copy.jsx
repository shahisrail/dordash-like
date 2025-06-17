"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSearch, FaBell, FaShoppingCart } from "react-icons/fa";
import { logout } from "../../../redux/features/auth/authSlice";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to='/'>
            <div className="text-2xl font-bold   text-black p-4 bg-clip-text   animate-pulse-custom">
              🍕 FoodieHub
            </div>{" "}
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div
            className={`relative transition-all duration-300 ${
              searchFocused ? "transform scale-105" : ""
            }`}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch
                className={`h-5 w-5 transition-colors duration-300 ${
                  searchFocused ? "text-blue-500" : "text-gray-400"
                }`}
              />
            </div>
            <input
              type="text"
              placeholder="Search for restaurants, food..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 hover-scale">
            <FaBell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          {/* Cart */}
          <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 hover-scale">
            <FaShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-custom">
              2
            </span>
          </button>

          {/* Profile */}
          <div className="relative">
            {user ? (
              <div
                className="flex items-center cursor-pointer select-none p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover-lift"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="ml-3 font-semibold text-gray-700">
                  {user.name}
                </span>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign In
              </Link>
            )}

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-16 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-10 animate-fadeInUp overflow-hidden">
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    👤 Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📦 My Orders
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    ⚙️ Settings
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
