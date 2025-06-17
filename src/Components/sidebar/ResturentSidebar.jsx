import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaUtensils,
  FaClipboardList,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaEdit,
  FaChevronDown,
  FaChevronRight,
  FaEye,
  FaLayerGroup,
  FaTags,
} from "react-icons/fa";

const RestaurantSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expandedMenus, setExpandedMenus] = useState({ menu: true });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
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
      path: "/restaurant/dashboard",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      key: "restaurant",
      title: "Restaurant Info",
      icon: <FaEye />,
      color: "text-green-500",
      bgColor: "bg-green-50",
      submenu: [
        { title: "View Info", path: "/restaurant/me", icon: <FaEye /> },
        {
          title: "Update Info",
          path: "/restaurant/update-info",
          icon: <FaEdit />,
        },
      ],
    },
    {
      key: "menu",
      title: "Menu Management",
      icon: <FaUtensils />,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      submenu: [
        {
          title: "Create Category",
          path: "/restaurant/menu/create-category",
          icon: <FaLayerGroup />,
        },
        {
          title: "Create Subcategory",
          path: "/restaurant/menu/create-subcategory",
          icon: <FaTags />,
        },
        {
          title: "Add Food Item",
          path: "/restaurant/menu/create-food",
          icon: <FaPlus />,
        },
        { title: "Food List", path: "/restaurant/food/list", icon: <FaList /> },
      ],
    },
    {
      key: "orders",
      title: "Orders",
      icon: <FaClipboardList />,
      path: "/restaurant/orders",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      key: "analytics",
      title: "Analytics",
      icon: <FaChartLine />,
      path: "/restaurant/analytics",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      key: "settings",
      title: "Settings",
      icon: <FaCog />,
      path: "/restaurant/settings",
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
      <div className="p-6 bg-gradient-to-r from-orange-500 to-red-600 text-white relative">
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
              <h2 className="text-2xl font-bold mb-2">Restaurant Panel</h2>
              <p className="text-orange-100 text-sm">Manage your restaurant</p>
            </>
          ) : (
            <div className="text-2xl font-bold text-center">🍽️</div>
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
                                ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
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
      <div className="absolute  w-[300px] bottom-0 mt-5 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="flex items-center p-3 bg-gray-50 rounded-xl animate-fadeInUp">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                R
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Restaurant Owner</p>
                <p className="text-xs text-gray-500">
                  restaurant@foodiehub.com
                </p>
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

export default RestaurantSidebar;
