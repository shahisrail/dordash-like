import { useState, useEffect } from "react";
import {
  FaUsers,
  FaStore,
  FaChartLine,
  FaDollarSign,
  FaEye,
  FaStar,
} from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalUsers: 1250,
        totalRestaurants: 85,
        totalOrders: 3420,
        totalRevenue: 125000,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+12%",
      changeColor: "text-green-500",
    },
    {
      title: "Restaurants",
      value: stats.totalRestaurants,
      icon: <FaStore />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+8%",
      changeColor: "text-green-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FaChartLine />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+23%",
      changeColor: "text-green-500",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <FaDollarSign />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+18%",
      changeColor: "text-green-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New restaurant registered",
      time: "2 minutes ago",
      type: "restaurant",
    },
    {
      id: 2,
      action: "User complaint resolved",
      time: "15 minutes ago",
      type: "user",
    },
    { id: 3, action: "Payment processed", time: "1 hour ago", type: "payment" },
    { id: 4, action: "New order placed", time: "2 hours ago", type: "order" },
    {
      id: 5,
      action: "Restaurant approved",
      time: "3 hours ago",
      type: "restaurant",
    },
  ];

  const topRestaurants = [
    { name: "Pizza Palace", orders: 245, revenue: "$12,450", rating: 4.8 },
    { name: "Burger Barn", orders: 198, revenue: "$9,890", rating: 4.6 },
    { name: "Sushi Spot", orders: 167, revenue: "$15,670", rating: 4.9 },
    { name: "Taco Town", orders: 134, revenue: "$6,780", rating: 4.5 },
    { name: "Pasta Place", orders: 112, revenue: "$8,900", rating: 4.7 },
  ];

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
            Admin Dashboard 📊
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your platform.
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
                  <FiTrendingUp className="mr-1" />
                  {card.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">
                {card.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideInLeft">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaChartLine className="mr-3 text-blue-500" />
                Recent Activities
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`p-2 rounded-lg mr-4 ${
                        activity.type === "restaurant"
                          ? "bg-purple-100 text-purple-600"
                          : activity.type === "user"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "payment"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {activity.type === "restaurant" ? (
                        <FaStore />
                      ) : activity.type === "user" ? (
                        <FaUsers />
                      ) : activity.type === "payment" ? (
                        <FaDollarSign />
                      ) : (
                        <FaChartLine />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                      <FaEye />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Restaurants */}
          <div className="animate-slideInRight">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaStore className="mr-3 text-purple-500" />
                Top Restaurants
              </h2>
              <div className="space-y-4">
                {topRestaurants.map((restaurant, index) => (
                  <div
                    key={restaurant.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {restaurant.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {restaurant.orders} orders
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {restaurant.revenue}
                      </p>
                      <div className="flex items-center text-sm text-yellow-500">
                        <FaStar className="mr-1" />
                        {restaurant.rating}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaUsers className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
              <p className="text-blue-100 text-sm">View and manage all users</p>
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaStore className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Add Restaurant</h3>
              <p className="text-purple-100 text-sm">
                Register new restaurants
              </p>
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaChartLine className="text-3xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">View Reports</h3>
              <p className="text-green-100 text-sm">
                Analyze platform performance
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
