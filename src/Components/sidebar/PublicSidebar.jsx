"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUtensils,
  FaShoppingCart,
  FaLaptop,
  FaBook,
  FaTshirt,
  FaChevronRight,
} from "react-icons/fa";

const PublicSidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    {
      name: "Restaurant",
      path: "resturent",
      icon: <FaUtensils />,
      color: "from-red-400 to-red-600",
      emoji: "🍽️",
    },
    {
      name: "Grocery",
      path: "/",
      icon: <FaShoppingCart />,
      color: "from-green-400 to-green-600",
      emoji: "🛒",
    },
    {
      name: "Electronics",
      path: "/",
      icon: <FaLaptop />,
      color: "from-blue-400 to-blue-600",
      emoji: "💻",
    },
    {
      name: "Books",
      path: "/",
      icon: <FaBook />,
      color: "from-purple-400 to-purple-600",
      emoji: "📚",
    },
    {
      name: "Fashion",
      path: "/",
      icon: <FaTshirt />,
      color: "from-pink-400 to-pink-600",
      emoji: "👕",
    },
  ];

  return (
    <div className="w-72 bg-white shadow-2xl min-h-screen border-r border-gray-200">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h2 className="text-2xl font-bold mb-2 animate-fadeInUp">Categories</h2>
        <p
          className="text-blue-100 text-sm animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          Discover amazing deals
        </p>
      </div>

      {/* Categories */}
      <div className="p-4">
        <ul className="space-y-3">
          {categories.map((category, index) => (
            <li
              key={category.name}
              className="animate-slideInLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                to={category.path}
                className={`group flex items-center p-4 rounded-xl transition-all duration-300 hover-lift ${
                  location.pathname === `/${category.path}`
                    ? "bg-gradient-to-r " +
                      category.color +
                      " text-white shadow-lg"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-lg mr-4 transition-all duration-300 ${
                    location.pathname === `/${category.path}`
                      ? "bg-white/20 text-white"
                      : `bg-gradient-to-r ${category.color} text-white group-hover:scale-110`
                  }`}
                >
                  {category.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      {category.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{category.emoji}</span>
                      <FaChevronRight
                        className={`transition-transform duration-300 ${
                          hoveredItem === index ? "transform translate-x-1" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Promotional Banner */}
      <div className="m-4 p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl text-white animate-fadeInUp">
        <div className="text-center">
          <div className="text-3xl mb-2">🎉</div>
          <h3 className="font-bold text-lg mb-2">Special Offer!</h3>
          <p className="text-sm opacity-90 mb-3">
            Get 20% off on your first order
          </p>
          <button className="bg-white text-orange-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
            Claim Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicSidebar;
