"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../redux/features/resturent/resturentApi";
import { FaTag,  FaPlus, FaArrowLeft, FaList } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { data: categoriesData, refetch } = useGetAllCategoriesQuery();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [focusedField, setFocusedField] = useState("");

  const categories = categoriesData?.categories || [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter a category name.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a category description.");
      return;
    }

    try {
      await createCategory(formData).unwrap();
      toast.success("Category created successfully!");
      setFormData({ name: "", description: "" });
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 animate-fade-in">
          <button
            onClick={() => navigate("/restaurant/food-list")}
            className="mr-4 p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Categories
            </h1>
            <p className="text-gray-600">
              Create and organize your menu categories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Category Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <FaPlus className="text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Create New Category
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Name */}
              <div
                className="animate-fade-in-delay"
                style={{ animationDelay: "200ms" }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTag
                      className={`h-5 w-5 transition-colors duration-200 ${
                        focusedField === "name"
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="e.g., Appetizers, Main Course, Desserts"
                    required
                  />
                </div>
              </div>

              {/* Category Description */}
              <div
                className="animate-fade-in-delay"
                style={{ animationDelay: "300ms" }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <div className="relative group">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <FiFileText
                      className={`h-5 w-5 transition-colors duration-200 ${
                        focusedField === "description"
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("description")}
                    onBlur={() => setFocusedField("")}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                    placeholder="Describe this category..."
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Category...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaPlus className="mr-2" />
                    Create Category
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Existing Categories */}
          <div
            className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <FaList className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Existing Categories
              </h2>
            </div>

            {categories.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTag className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No categories yet
                </h3>
                <p className="text-gray-600">
                  Create your first category to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {categories.map((category, index) => (
                  <div
                    key={category._id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 animate-fade-in-delay"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <FaTag className="text-orange-600 text-sm" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {category.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => navigate("/restaurant/create-food")}
                  className="bg-orange-50 border border-orange-200 text-orange-600 py-3 px-4 rounded-xl font-semibold hover:bg-orange-100 transition-all duration-200 flex items-center justify-center"
                >
                  <FaPlus className="mr-2" />
                  Add Food Item
                </button>
                <button
                  onClick={() => navigate("/restaurant/food-list")}
                  className="bg-gray-50 border border-gray-200 text-gray-600 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
                >
                  <FaList className="mr-2" />
                  View All Items
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div
          className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6 animate-fade-in-delay"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">Pro Tip</h3>
              <p className="text-sm text-orange-700 mt-1">
                Organize your menu with clear categories like "Appetizers",
                "Main Course", "Beverages", and "Desserts" to help customers
                navigate your menu easily.
              </p>
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

export default CreateCategory;
