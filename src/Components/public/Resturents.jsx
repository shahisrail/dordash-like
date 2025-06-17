"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaClock, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

const Resturents = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/public/restaurants"
        );
        setRestaurants(res.data.restaurants || []);
      } catch (error) {
        console.error("Failed to load restaurants", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-300 shimmer"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-3 shimmer"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 shimmer"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fadeInUp">
            Available Restaurants 🍽️
          </h1>
          <p
            className="text-xl text-blue-100 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Discover delicious food from top-rated restaurants
          </p>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift cursor-pointer group animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/menu/${restaurant._id}`)}
            >
              {/* Restaurant Image */}
              <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-80">🍽️</div>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(restaurant._id);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                    favorites.has(restaurant._id)
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-white"
                  }`}
                >
                  <FaHeart
                    className={`transition-transform duration-300 ${
                      favorites.has(restaurant._id)
                        ? "scale-110"
                        : "hover:scale-110"
                    }`}
                  />
                </button>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Open
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {restaurant.name}
                </h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <span className="text-sm">{restaurant.address}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="text-sm font-semibold text-green-700">
                        4.5
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm ml-2">
                      (120+ reviews)
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500">
                    <FaClock className="mr-1" />
                    <span className="text-sm">25-30 min</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    Fast Food
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Free Delivery
                  </span>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>

        {restaurants.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No Restaurants Found
            </h3>
            <p className="text-gray-500">
              Check back later for new restaurants!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resturents;
