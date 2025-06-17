"use client";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
  FaChevronRight,
  FaUser,
  FaGift,
  FaBell,
  FaHistory,
} from "react-icons/fa";

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "dashboard",
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/user/dashboard",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      badge: null,
    },
    {
      key: "orders",
      title: "My Orders",
      icon: <FaShoppingBag />,
      path: "/user/orders",
      color: "text-green-500",
      bgColor: "bg-green-50",
      badge: "3",
    },
    {
      key: "favorites",
      title: "Favorites",
      icon: <FaHeart />,
      path: "/user/favorites",
      color: "text-red-500",
      bgColor: "bg-red-50",
      badge: "8",
    },
    {
      key: "addresses",
      title: "Addresses",
      icon: <FaMapMarkerAlt />,
      path: "/user/addresses",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      badge: null,
    },
    {
      key: "rewards",
      title: "Rewards",
      icon: <FaGift />,
      path: "/user/rewards",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      badge: "1250",
    },
    {
      key: "notifications",
      title: "Notifications",
      icon: <FaBell />,
      path: "/user/notifications",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      badge: "5",
    },
    {
      key: "history",
      title: "Order History",
      icon: <FaHistory />,
      path: "/user/history",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      badge: null,
    },
    {
      key: "profile",
      title: "Profile",
      icon: <FaUser />,
      path: "/user/profile",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      badge: null,
    },
    {
      key: "settings",
      title: "Settings",
      icon: <FaCog />,
      path: "/user/settings",
      color: "text-gray-500",
      bgColor: "bg-gray-50",
      badge: null,
    },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } bg-white shadow-2xl min-h-screen transition-all duration-300 ease-in-out border-r border-gray-200`}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white relative">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-300"
        >
          <FaChevronRight
            className={`transform transition-transform duration-300 ${
              isCollapsed ? "" : "rotate-180"
            }`}
          />
        </button>

        <div className="animate-fadeInUp">
          {!isCollapsed ? (
            <>
              <h2 className="text-2xl font-bold mb-2">My Account</h2>
              <p className="text-green-100 text-sm">Welcome back, John!</p>
            </>
          ) : (
            <div className="text-2xl font-bold text-center">👤</div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-3 animate-fadeInUp">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600">24</div>
              <div className="text-xs text-gray-500">Total Orders</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-600">1,250</div>
              <div className="text-xs text-gray-500">Points</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={item.key}
              className="animate-slideInLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                to={item.path}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover-lift group ${
                  isActiveLink(item.path)
                    ? `bg-gradient-to-r from-${
                        item.color.split("-")[1]
                      }-500 to-${
                        item.color.split("-")[1]
                      }-600 text-white shadow-lg`
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 transition-all duration-300 ${
                      isActiveLink(item.path)
                        ? "bg-white/20 text-white"
                        : `${item.bgColor} ${item.color} group-hover:scale-110`
                    }`}
                  >
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className="font-semibold">{item.title}</span>
                  )}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                      isActiveLink(item.path)
                        ? "bg-white/20 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="flex items-center p-3 bg-gray-50 rounded-xl animate-fadeInUp">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                J
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaSignOutAlt className={`${!isCollapsed ? "mr-2" : ""}`} />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
