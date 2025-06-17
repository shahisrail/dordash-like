"use client";
import { useNavigate } from "react-router-dom";
import { useGetMyRestaurantQuery } from "../../redux/features/resturent/resturentApi";
import {
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaClock,
  FaStar,
} from "react-icons/fa";

const ShowInfo = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetMyRestaurantQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurant information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <p className="text-red-600">Error loading restaurant information</p>
        </div>
      </div>
    );
  }

  const restaurant = data?.restaurant;

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaStore className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-600">No restaurant information found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
            <FaStore className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Restaurant Information
          </h1>
          <p className="text-gray-600">
            Manage your restaurant details and settings
          </p>
        </div>

        {/* Main Info Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {restaurant.name}
                </h2>
                <p className="text-orange-100">Restaurant Profile</p>
              </div>
              <button
                onClick={() => navigate("/restaurant/update-info")}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center backdrop-blur-sm"
              >
                <FaEdit className="mr-2" />
                Edit Info
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <FaStore className="text-orange-600" />
                  </div>
                  Basic Information
                </h3>

                <div className="space-y-4">
                  <div
                    className="flex items-start animate-fade-in-delay"
                    style={{ animationDelay: "200ms" }}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FaStore className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Restaurant Name
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {restaurant.name}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-start animate-fade-in-delay"
                    style={{ animationDelay: "300ms" }}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FaUser className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Owner Name</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {restaurant.ownerName}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-start animate-fade-in-delay"
                    style={{ animationDelay: "400ms" }}
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FaMapMarkerAlt className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Address</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {restaurant.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FaEnvelope className="text-blue-600" />
                  </div>
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div
                    className="flex items-start animate-fade-in-delay"
                    style={{ animationDelay: "500ms" }}
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FaEnvelope className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Email Address
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {restaurant.email}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-start animate-fade-in-delay"
                    style={{ animationDelay: "600ms" }}
                  >
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FaPhone className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {restaurant.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Restaurant Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 animate-fade-in-delay"
                  style={{ animationDelay: "700ms" }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FaClock className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-blue-600 font-medium">
                        Status
                      </p>
                      <p className="text-xl font-bold text-blue-800">Active</p>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 animate-fade-in-delay"
                  style={{ animationDelay: "800ms" }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <FaStar className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-green-600 font-medium">
                        Rating
                      </p>
                      <p className="text-xl font-bold text-green-800">4.5/5</p>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 animate-fade-in-delay"
                  style={{ animationDelay: "900ms" }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <FaStore className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-purple-600 font-medium">
                        Menu Items
                      </p>
                      <p className="text-xl font-bold text-purple-800">0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/restaurant/update-info")}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
              >
                <FaEdit className="mr-2" />
                Update Information
              </button>
              <button
                onClick={() => navigate("/restaurant/menu")}
                className="flex-1 bg-white border-2 border-orange-500 text-orange-600 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center justify-center"
              >
                <FaStore className="mr-2" />
                Manage Menu
              </button>
            </div>
          </div>
        </div>
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

export default ShowInfo;
