"use client";

import { useState } from "react";
import { useGetAllUsersQuery } from "../../Redux/features/admin/adminApi";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSearch,
  FaUsers,
  FaCrown,
  FaStore,
} from "react-icons/fa";
import { toast } from "react-toastify";

const ShowAllUser = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to fetch users.");
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <p className="text-red-600">Error loading users</p>
        </div>
      </div>
    );
  }

  const users = data?.users || [];

  // Filter users based on search term and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm));
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Get role statistics
  const roleStats = {
    total: users.length,
    admin: users.filter((u) => u.role === "admin").length,
    restaurant: users.filter((u) => u.role === "restaurant").length,
    user: users.filter((u) => u.role === "user" || !u.role).length,
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaCrown className="text-yellow-600" />;
      case "restaurant":
        return <FaStore className="text-orange-600" />;
      default:
        return <FaUser className="text-blue-600" />;
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Admin" },
      restaurant: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        label: "Restaurant",
      },
      user: { bg: "bg-blue-100", text: "text-blue-800", label: "User" },
    };

    const config = roleConfig[role] || roleConfig.user;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">Manage all users in the system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className="bg-white rounded-xl p-6 shadow-lg animate-fade-in-delay"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">
                  {roleStats.total}
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-xl p-6 shadow-lg animate-fade-in-delay"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaCrown className="text-yellow-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-800">
                  {roleStats.admin}
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-xl p-6 shadow-lg animate-fade-in-delay"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaStore className="text-orange-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Restaurants</p>
                <p className="text-2xl font-bold text-gray-800">
                  {roleStats.restaurant}
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-xl p-6 shadow-lg animate-fade-in-delay"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaUser className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Customers</p>
                <p className="text-2xl font-bold text-gray-800">
                  {roleStats.user}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="md:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="restaurant">Restaurant</option>
                <option value="user">Customer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        {filteredUsers.length === 0 ? (
          <div
            className="bg-white rounded-xl p-12 text-center shadow-lg animate-fade-in-delay"
            style={{ animationDelay: "500ms" }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              {searchTerm || roleFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No users have been registered yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, index) => (
              <div
                key={user._id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-delay"
                style={{ animationDelay: `${500 + index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    {getRoleIcon(user.role)}
                  </div>
                  {getRoleBadge(user.role)}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {user.name}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-3 text-gray-400 flex-shrink-0" />
                    <span className="truncate text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-sm">
                      {user.phone || "Not provided"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      ID: {user._id.slice(-6)}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ShowAllUser;
