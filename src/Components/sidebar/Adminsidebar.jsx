"use client";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaStore,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaChevronDown,
  FaChevronRight,
  FaBell,
  FaUserShield,
} from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const menuItems = [
    {
      key: "dashboard",
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      key: "restaurants",
      title: "Restaurants",
      icon: <FaStore />,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      submenu: [
        {
          title: "Add Restaurant",
          path: "/admin/add-resturent",
          icon: <FaPlus />,
        },
        {
          title: "All Restaurants",
          path: "/admin/showAllRestaurants",
          icon: <FaList />,
        },
        {
          title: "Pending Approval",
          path: "/admin/pending-restaurants",
          icon: <FaCog />,
        },
      ],
    },
    {
      key: "users",
      title: "Users",
      icon: <FaUsers />,
      color: "text-green-500",
      bgColor: "bg-green-50",
      submenu: [
        { title: "All Users", path: "/admin/showAllUsers", icon: <FaList /> },
        {
          title: "User Analytics",
          path: "/admin/user-analytics",
          icon: <FaChartBar />,
        },
        {
          title: "Manage Roles",
          path: "/admin/manage-roles",
          icon: <FaUserShield />,
        },
      ],
    },
    {
      key: "analytics",
      title: "Analytics",
      icon: <FaChartBar />,
      path: "/admin/analytics",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      key: "notifications",
      title: "Notifications",
      icon: <FaBell />,
      path: "/admin/notifications",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      key: "settings",
      title: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
      color: "text-gray-500",
      bgColor: "bg-gray-50",
    },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const isActiveMenu = (submenu) => {
    return submenu?.some((item) => location.pathname === item.path);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } bg-white shadow-2xl min-h-screen transition-all duration-300 ease-in-out border-r border-gray-200`}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative">
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
              <h2 className="text-2xl font-bold mb-2">Admin Panel</h2>
              <p className="text-blue-100 text-sm">Manage your platform</p>
            </>
          ) : (
            <div className="text-2xl font-bold text-center">🛡️</div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={item.key}
              className="animate-slideInLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover-lift group ${
                      isActiveMenu(item.submenu)
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
                          isActiveMenu(item.submenu)
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
                    {!isCollapsed && (
                      <FaChevronDown
                        className={`transition-transform duration-300 ${
                          expandedMenus[item.key] ? "transform rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Submenu */}
                  {!isCollapsed && expandedMenus[item.key] && (
                    <ul className="mt-2 ml-4 space-y-1 animate-slideInUp">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`flex items-center p-3 rounded-lg transition-all duration-300 hover-lift ${
                              isActiveLink(subItem.path)
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                                : "hover:bg-gray-100 text-gray-600"
                            }`}
                          >
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-all duration-300 ${
                                isActiveLink(subItem.path)
                                  ? "bg-white/20 text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {subItem.icon}
                            </div>
                            <span className="font-medium">{subItem.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-xl transition-all duration-300 hover-lift group ${
                    isActiveLink(item.path)
                      ? `bg-gradient-to-r from-${
                          item.color.split("-")[1]
                        }-500 to-${
                          item.color.split("-")[1]
                        }-600 text-white shadow-lg`
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
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
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="absolute bottom-0 w-[300px] left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="flex items-center p-3 bg-gray-50 rounded-xl animate-fadeInUp">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                A
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@foodiehub.com</p>
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

export default AdminSidebar;
