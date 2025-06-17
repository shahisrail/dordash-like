"use client";

import { useState } from "react";
import {
  useGetAllRestaurantsQuery,
  useDeleteRestaurantMutation,
} from "../../Redux/features/admin/adminApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const ShowAllRestaurants = () => {
  const { data, isLoading, refetch, error } = useGetAllRestaurantsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [deleteRestaurant] = useDeleteRestaurantMutation();
  const navigate = useNavigate();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <p className="text-red-600">Error loading restaurants</p>
        </div>
      </div>
    );
  }

  const restaurants = data?.restaurants || [];
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/admin/edit-restaurant/${id}`);
  };

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRestaurant(confirmDeleteId).unwrap();
      toast.success("Restaurant deleted successfully!");
      setConfirmDeleteId(null);
      refetch();
    } catch (err) {
      toast.error("Failed to delete restaurant!");
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Restaurant Management
            </h1>
            <p className="text-gray-600">
              Manage all restaurants in the system
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/add-restaurant")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Restaurant
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 animate-slide-up">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className="bg-white rounded-xl p-6 shadow-lg animate-fade-in-delay"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaStore className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Restaurants</p>
                <p className="text-2xl font-bold text-gray-800">
                  {restaurants.length}
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-xl p-6 shadow-lg animate-fade-in-delay"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaUser className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Owners</p>
                <p className="text-2xl font-bold text-gray-800">
                  {restaurants.length}
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-xl p-6 shadow-lg animate-fade-in-delay"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaSearch className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Search Results</p>
                <p className="text-2xl font-bold text-gray-800">
                  {filteredRestaurants.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        {filteredRestaurants.length === 0 ? (
          <div
            className="bg-white rounded-xl p-12 text-center shadow-lg animate-fade-in-delay"
            style={{ animationDelay: "500ms" }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStore className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding your first restaurant"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate("/admin/add-restaurant")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <FaPlus className="mr-2 inline" />
                Add First Restaurant
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant, index) => (
              <div
                key={restaurant._id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-delay"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FaStore className="text-white text-xl" />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(restaurant._id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Edit Restaurant"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(restaurant._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete Restaurant"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {restaurant.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-gray-400" />
                    <span>{restaurant.ownerName}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-gray-400" />
                    <span className="truncate">{restaurant.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-gray-400" />
                    <span>{restaurant.phone}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                    <button
                      onClick={() => handleEdit(restaurant._id)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDeleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scale-up">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrash className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Delete Restaurant
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this restaurant? This action
                  cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleCancelDelete}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
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

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ShowAllRestaurants;
