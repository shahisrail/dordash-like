"use client";

import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
} from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    // Simulate loading user profile data
    setTimeout(() => {
      const profileData = {
        name: userData?.name || "John Doe",
        email: userData?.email || "john@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001",
      };
      setFormData(profileData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log("Saving profile data:", formData);
    setIsEditing(false);
    // Update localStorage user data
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleCancel = () => {
    // Reset form data
    const userData = JSON.parse(localStorage.getItem("user"));
    setFormData({
      name: userData?.name || "John Doe",
      email: userData?.email || "john@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
    });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl animate-pulse">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-gray-300 rounded-full shimmer"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-300 rounded mb-2 shimmer"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 shimmer"></div>
            </div>
          </div>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/4 shimmer"></div>
                <div className="h-12 bg-gray-300 rounded shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Profile 👤
          </h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-6 animate-slideInLeft">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                    <FaCamera className="text-gray-600" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                  {formData.name}
                </h2>
                <p className="text-gray-600">{user?.role || "Customer"}</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-medium">
                      Member Since
                    </span>
                    <span className="text-green-600 font-bold">Jan 2024</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-medium">
                      Total Orders
                    </span>
                    <span className="text-blue-600 font-bold">24</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-700 font-medium">
                      Loyalty Points
                    </span>
                    <span className="text-purple-600 font-bold">1,250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slideInRight">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-800">
                  Profile Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                    >
                      <FaSave className="mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                    >
                      <FaTimes className="mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div className="animate-fadeInUp">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaUser className="mr-2 text-blue-500" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">
                      {formData.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div
                  className="animate-fadeInUp"
                  style={{ animationDelay: "0.1s" }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaEnvelope className="mr-2 text-green-500" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">
                      {formData.email}
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div
                  className="animate-fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaPhone className="mr-2 text-purple-500" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">
                      {formData.phone}
                    </div>
                  )}
                </div>

                {/* Address Field */}
                <div
                  className="animate-fadeInUp"
                  style={{ animationDelay: "0.3s" }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white resize-none"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">
                      {formData.address}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Account Actions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Change Password
                  </button>
                  <button className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
