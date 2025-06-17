"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaSearch,
  FaBell,
  FaShoppingCart,
  FaHome,
  FaBriefcase,
  FaExchangeAlt,
  FaUsers,
  FaStore,
  FaComments,
  FaWarehouse,
  FaPlusSquare,
  FaUserMd,
  FaDollarSign,
  FaCalendarAlt,
  FaTag,
  FaMotorcycle,
  FaStar,
  FaClock,
} from "react-icons/fa";
import { logout } from "../../../redux/features/auth/authSlice";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // For filter dropdown
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/login");
  };

  const navItems = [
    { label: "Doctor", icon: <FaUserMd />, color: "#4ade80" }, // green-400
    { label: "Home", icon: <FaHome />, color: "#3b82f6" }, // blue-500
    { label: "Home Business", icon: <FaBriefcase />, color: "#a855f7" }, // purple-500
    { label: "Exchange Market", icon: <FaExchangeAlt />, color: "#f97316" }, // orange-500
    { label: "Community", icon: <FaUsers />, color: "#ec4899" }, // pink-500
    { label: "Business", icon: <FaStore />, color: "#22d3ee" }, // cyan-400
    { label: "Notification", icon: <FaBell />, color: "#facc15" }, // yellow-400
    { label: "Chats", icon: <FaComments />, color: "#6366f1" }, // indigo-500
    { label: "Garage Sale", icon: <FaWarehouse />, color: "#ef4444" }, // red-500
    { label: "Post", icon: <FaPlusSquare />, color: "#10b981" }, // emerald-500
  ];

  // Updated filter items with dropdown options
  const filterItems = [
    {
      label: "Delivery Fees",
      icon: <FaDollarSign />,
      dropdown: ["Under $3", "Under $5", "Free"],
    },
    {
      label: "Schedule",
      icon: <FaCalendarAlt />,
      dropdown: ["ASAP", "Later Today", "Tomorrow"],
    },
    {
      label: "Deals",
      icon: <FaTag />,
      dropdown: ["Discount", "Buy One Get One", "Free Delivery"],
    },
    {
      label: "Pickup",
      icon: <FaMotorcycle />,
      dropdown: ["Pickup Now", "Pickup Later"],
    },
    {
      label: "Over 4.5",
      icon: <FaStar />,
      dropdown: ["4.0+", "4.5+", "5.0"],
    },
    {
      label: "Under 30 min",
      icon: <FaClock />,
      dropdown: ["< 15 min", "< 30 min"],
    },
    {
      label: "Price",
      icon: <FaDollarSign />,
      dropdown: ["$", "$$", "$$$"],
    },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-4">
              <img
                src="/src/assets/logo.webp"
                className="w-[130px]"
                alt="Logo"
              />
            </div>
          </Link>

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

          {/* Right Actions */}
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
              cart
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
                  className="bg-gray    px-6 py-2 rounded-full font-semibold    transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign In
                </Link>
              )}

              {/* Profile Dropdown */}
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

      {/* Category Menu Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center gap-4 overflow-x-auto p-4 max-w-7xl mx-auto">
          <span className="text-gray-900 font-semibold text-lg whitespace-nowrap mr-4">
            All Categories
          </span>
          {navItems.map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110 min-w-[90px] group"
            >
              <div
                className="text-3xl mb-2 transform transition-all duration-500 ease-in-out group-hover:rotate-12 group-hover:scale-125 hover:animate-wiggle"
                style={{ color: item.color }}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium text-center whitespace-nowrap group-hover:font-semibold transition-all duration-200">
                {item.label}
              </span>
            </button>
          ))} 
        </div>
      </div>

      {/* Filter/Options Bar with Dropdowns */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto p-3 max-w-7xl mx-auto">
          {filterItems.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => toggleDropdown(index)}
                className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 whitespace-nowrap text-sm font-medium shadow-sm hover:shadow-md"
              >
                <span className="mr-2 text-md">{item.icon}</span>
                {item.label}
              </button>

              {/* Dropdown */}
              {openDropdownIndex === index && item.dropdown && (
                <ul className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-52 z-20 p-2">
                  {item.dropdown.map((option, idx) => (
                    <li key={idx}>
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded"
                        onClick={() => {
                          alert(`You selected "${option}" from ${item.label}`);
                          setOpenDropdownIndex(null);
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Topbar;
