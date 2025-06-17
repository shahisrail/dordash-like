"use client";

import { useState, useEffect } from "react";
import {
  FaUtensils,
  FaShoppingCart,
  FaDollarSign,
  FaStar,
  FaChartLine,
  FaClock,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    todayOrders: 0,
    totalRevenue: 0,
    averageRating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalOrders: 342,
        todayOrders: 28,
        totalRevenue: 15420,
        averageRating: 4.6,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: "Today's Orders",
      value: stats.todayOrders,
      icon: <FaShoppingCart />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+15%",
      changeColor: "text-green-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FaChartLine />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+23%",
      changeColor: "text-green-500",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <FaDollarSign />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+18%",
      changeColor: "text-green-500",
    },
    {
      title: "Rating",
      value: stats.averageRating,
      icon: <FaStar />,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      change: "+0.2",
      changeColor: "text-green-500",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      items: "2x Burger, 1x Fries",
      amount: "$25.50",
      status: "preparing",
      time: "5 min ago",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      items: "1x Pizza, 2x Coke",
      amount: "$32.00",
      status: "ready",
      time: "12 min ago",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      items: "3x Tacos, 1x Salad",
      amount: "$18.75",
      status: "delivered",
      time: "25 min ago",
    },
    {
      id: "#ORD-004",
      customer: "Sarah Wilson",
      items: "1x Pasta, 1x Garlic Bread",
      amount: "$22.30",
      status: "preparing",
      time: "35 min ago",
    },
    {
      id: "#ORD-005",
      customer: "Tom Brown",
      items: "2x Sandwich, 1x Juice",
      amount: "$16.80",
      status: "ready",
      time: "45 min ago",
    },
  ];

  const popularItems = [
    { name: "Classic Burger", orders: 45, revenue: "$450", trend: "up" },
    { name: "Margherita Pizza", orders: 38, revenue: "$380", trend: "up" },
    { name: "Caesar Salad", orders: 32, revenue: "$256", trend: "down" },
    { name: "Chicken Tacos", orders: 28, revenue: "$224", trend: "up" },
    { name: "Pasta Carbonara", orders: 25, revenue: "$275", trend: "stable" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-700";
      case "ready":
        return "bg-green-100 text-green-700";
      case "delivered":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <span className="text-green-500">↗️</span>;
      case "down":
        return <span className="text-red-500">↘️</span>;
      default:
        return <span className="text-gray-500">➡️</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8 shimmer"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="h-16 bg-gray-300 rounded mb-4 shimmer"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2 shimmer"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 shimmer"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Restaurant Dashboard 🍽️
          </h1>
          <p className="text-gray-600">
            Manage your restaurant and track performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow-lg hover-lift animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                  <div className={`text-2xl ${card.textColor}`}>
                    {card.icon}
                  </div>
                </div>
                <div
                  className={`flex items-center text-sm font-semibold ${card.changeColor}`}
                >
                  <FaChartLine className="mr-1" />
                  {card.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideInLeft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaShoppingCart className="mr-3 text-blue-500" />
                  Recent Orders
                </h2>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {order.id}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {order.customer}
                      </p>
                      <p className="text-sm text-gray-500">{order.items}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-green-600">
                          {order.amount}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <FaClock className="mr-1" />
                          {order.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300">
                        <FaEye />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-300">
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Items */}
          <div className="animate-slideInRight">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaUtensils className="mr-3 text-orange-500" />
                Popular Items
              </h2>
              <div className="space-y-4">
                {popularItems.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {item.orders} orders
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{item.revenue}</p>
                      <div className="flex items-center text-sm">
                        {getTrendIcon(item.trend)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="mt-8 animate-fadeInUp"
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <button
              onClick={() => navigate("/restaurant/menu/create-food")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaUtensils className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Add Food Item</h3>
              <p className="text-blue-100 text-sm">Create new menu items</p>
            </button>
            <button
              onClick={() => navigate("/restaurant/food/list")}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaChartLine className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">View Menu</h3>
              <p className="text-purple-100 text-sm">Manage your food items</p>
            </button>
            <button
              onClick={() => navigate("/restaurant/me")}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaEye className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Restaurant Info</h3>
              <p className="text-green-100 text-sm">View restaurant details</p>
            </button>
            <button
              onClick={() => navigate("/restaurant/update-info")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaEdit className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Update Info</h3>
              <p className="text-orange-100 text-sm">Edit restaurant details</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
