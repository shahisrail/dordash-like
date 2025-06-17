"use client";

import { useState, useEffect } from "react";
import {
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaGift,
} from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    favoriteRestaurants: 0,
    savedAddresses: 0,
    loyaltyPoints: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalOrders: 24,
        favoriteRestaurants: 8,
        savedAddresses: 3,
        loyaltyPoints: 1250,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const recentOrders = [
    {
      id: "#ORD-001",
      restaurant: "Pizza Palace",
      items: "2x Margherita Pizza, 1x Garlic Bread",
      amount: "$32.50",
      status: "delivered",
      date: "2 days ago",
      rating: 5,
    },
    {
      id: "#ORD-002",
      restaurant: "Burger Barn",
      items: "1x Classic Burger, 1x Fries, 1x Coke",
      amount: "$18.75",
      status: "delivered",
      date: "5 days ago",
      rating: 4,
    },
    {
      id: "#ORD-003",
      restaurant: "Sushi Spot",
      items: "12x California Roll, 6x Salmon Nigiri",
      amount: "$45.00",
      status: "delivered",
      date: "1 week ago",
      rating: 5,
    },
  ];

  const favoriteRestaurants = [
    {
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.8,
      deliveryTime: "25-30 min",
    },
    {
      name: "Burger Barn",
      cuisine: "American",
      rating: 4.6,
      deliveryTime: "20-25 min",
    },
    {
      name: "Sushi Spot",
      cuisine: "Japanese",
      rating: 4.9,
      deliveryTime: "30-35 min",
    },
    {
      name: "Taco Town",
      cuisine: "Mexican",
      rating: 4.5,
      deliveryTime: "15-20 min",
    },
  ];

  const achievements = [
    {
      title: "First Order",
      description: "Completed your first order",
      earned: true,
      icon: "🎉",
    },
    {
      title: "Loyal Customer",
      description: "Placed 10+ orders",
      earned: true,
      icon: "👑",
    },
    {
      title: "Food Explorer",
      description: "Tried 5+ cuisines",
      earned: true,
      icon: "🌍",
    },
    {
      title: "Review Master",
      description: "Left 20+ reviews",
      earned: false,
      icon: "⭐",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "preparing":
        return "bg-yellow-100 text-yellow-700";
      case "on-way":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
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
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Here's your food journey overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift animate-fadeInUp">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-50">
                <FaShoppingBag className="text-2xl text-blue-600" />
              </div>
              <div className="text-sm font-semibold text-green-500">
                +3 this month
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {stats.totalOrders}
            </p>
          </div>

          <div
            className="bg-white rounded-2xl p-6 shadow-lg hover-lift animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-50">
                <FaHeart className="text-2xl text-red-600" />
              </div>
              <div className="text-sm font-semibold text-green-500">
                +2 this week
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Favorite Restaurants
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {stats.favoriteRestaurants}
            </p>
          </div>

          <div
            className="bg-white rounded-2xl p-6 shadow-lg hover-lift animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-50">
                <FaMapMarkerAlt className="text-2xl text-green-600" />
              </div>
              <div className="text-sm font-semibold text-blue-500">
                +1 recent
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Saved Addresses
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {stats.savedAddresses}
            </p>
          </div>

          <div
            className="bg-white rounded-2xl p-6 shadow-lg hover-lift animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-yellow-50">
                <FaGift className="text-2xl text-yellow-600" />
              </div>
              <div className="text-sm font-semibold text-purple-500">
                +50 earned
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Loyalty Points
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {stats.loyaltyPoints}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideInLeft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaShoppingBag className="mr-3 text-blue-500" />
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
                    className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-gray-800 mr-3">
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
                      <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < order.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <h5 className="font-medium text-gray-700 mb-2">
                      {order.restaurant}
                    </h5>
                    <p className="text-sm text-gray-600 mb-3">{order.items}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-green-600">
                        {order.amount}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-1" />
                        {order.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorite Restaurants */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideInRight">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaHeart className="mr-2 text-red-500" />
                Favorites
              </h2>
              <div className="space-y-3">
                {favoriteRestaurants.map((restaurant, index) => (
                  <div
                    key={restaurant.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {restaurant.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {restaurant.cuisine}
                      </p>
                      <div className="flex items-center mt-1">
                        <FaStar className="text-yellow-500 text-xs mr-1" />
                        <span className="text-xs text-gray-600">
                          {restaurant.rating}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          {restaurant.deliveryTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6 animate-slideInRight"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaGift className="mr-2 text-purple-500" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.title}
                    className={`flex items-center p-3 rounded-xl transition-colors duration-300 animate-fadeInUp ${
                      achievement.earned
                        ? "bg-green-50 border border-green-200"
                        : "bg-gray-50"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-2xl mr-3">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold text-sm ${
                          achievement.earned
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        {achievement.title}
                      </h4>
                      <p
                        className={`text-xs ${
                          achievement.earned
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
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
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaShoppingBag className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Order Again</h3>
              <p className="text-blue-100 text-sm">Reorder your favorites</p>
            </button>
            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaHeart className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Favorites</h3>
              <p className="text-red-100 text-sm">View saved restaurants</p>
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaMapMarkerAlt className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Addresses</h3>
              <p className="text-green-100 text-sm">
                Manage delivery locations
              </p>
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaGift className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Rewards</h3>
              <p className="text-purple-100 text-sm">Redeem loyalty points</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
