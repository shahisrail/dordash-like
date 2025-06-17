"use client";

import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaDollarSign,
  FaImage,
  FaLayerGroup,
  FaPlus,
  FaTag,
  FaUtensils,
} from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateFoodItemMutation,
  useGetAllCategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
} from "../../redux/features/resturent/resturentApi";

const CreateFoodItem = () => {
  const navigate = useNavigate();
  const [createFoodItem, { isLoading: isCreatingFoodItem }] = useCreateFoodItemMutation();
  const { data: categoriesData, isLoading: areCategoriesLoading } = useGetAllCategoriesQuery();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",    // <-- CHANGED from 'category'
    subcategoryId: "", // <-- CHANGED from 'subcategory'
    imageUrl: "",      // <-- CHANGED from 'image'
  });

  const [focusedField, setFocusedField] = useState("");

  const categories = categoriesData?.categories || [];

  // Fetch subcategories based on selected category ID
  const {
    data: subcategoriesData,
    isLoading: areSubcategoriesLoading,
    isFetching: isSubcategoriesFetching,
  } = useGetSubcategoriesByCategoryQuery(formData.categoryId, { // <-- USED formData.categoryId
    skip: !formData.categoryId,
  });

  const subcategories = subcategoriesData?.subcategories || [];

  // Effect to reset subcategory when category changes
  useEffect(() => {
    // Only reset subcategory if the selected category is truly different
    // and not just due to initial load or refetch of categories
    if (formData.categoryId && !subcategories.some(sub => sub._id === formData.subcategoryId)) {
      setFormData((prev) => ({ ...prev, subcategoryId: "" }));
    } else if (!formData.categoryId) {
       setFormData((prev) => ({ ...prev, subcategoryId: "" }));
    }
  }, [formData.categoryId, subcategories]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation - updated to use new field names
    const requiredFields = ["name", "description", "price", "categoryId", "imageUrl"];
    for (const key of requiredFields) {
      if (formData[key].trim() === "") {
        toast.error(`Please fill the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return;
      }
    }

    // Subcategory is now also required if a category is selected
    if (formData.categoryId && formData.subcategoryId.trim() === "") {
        toast.error("Please select a subcategory.");
        return;
    }


    if (isNaN(formData.price) || Number.parseFloat(formData.price) <= 0) {
      toast.error("Please enter a valid price (must be a positive number).");
      return;
    }

    try {
      await createFoodItem({
        ...formData, // Will now correctly include categoryId, subcategoryId, imageUrl
        price: Number.parseFloat(formData.price),
      }).unwrap();
      toast.success("Food item created successfully!");
      navigate("/restaurant/food-list");
    } catch (error) {
      console.error("Failed to create food item:", error);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Food Name",
      icon: FaUtensils,
      type: "text",
      placeholder: "Enter food name",
    },
    {
      name: "description",
      label: "Description",
      icon: FiFileText,
      type: "textarea",
      placeholder: "Describe your food item",
    },
    {
      name: "price",
      label: "Price ($)",
      icon: FaDollarSign,
      type: "number",
      placeholder: "0.00",
    },
    {
      name: "imageUrl", // <-- CHANGED from 'image'
      label: "Image URL",
      icon: FaImage,
      type: "url",
      placeholder: "https://example.com/image.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
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
              Add New Food Item
            </h1>
            <p className="text-gray-600">Create a new item for your menu</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field, index) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.name}
                  className="animate-fade-in-delay"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon
                        className={`h-5 w-5 transition-colors duration-200 ${
                          focusedField === field.name
                            ? "text-orange-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField("")}
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                        placeholder={field.placeholder}
                        required
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField("")}
                        step={field.type === "number" ? "0.01" : undefined}
                        min={field.type === "number" ? "0" : undefined}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        placeholder={field.placeholder}
                        required
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Category Selection */}
            <div
              className="animate-fade-in-delay"
              style={{ animationDelay: "400ms" }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTag
                    className={`h-5 w-5 transition-colors duration-200 ${
                      focusedField === "categoryId" // <-- CHANGED to categoryId
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <select
                  name="categoryId" // <-- CHANGED to categoryId
                  value={formData.categoryId}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("categoryId")} // <-- CHANGED to categoryId
                  onBlur={() => setFocusedField("")}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                  disabled={areCategoriesLoading}
                >
                  <option value="">
                    {areCategoriesLoading ? "Loading categories..." : "Select a category"}
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {categories.length === 0 && !areCategoriesLoading && (
                <p className="text-sm text-orange-600 mt-2">
                  No categories found. Please create a category first.
                </p>
              )}
            </div>

            {/* Subcategory Selection - Conditionally rendered */}
            {formData.categoryId && ( // <-- USED formData.categoryId
              <div
                className="animate-fade-in-delay"
                style={{ animationDelay: "500ms" }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subcategory
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLayerGroup
                      className={`h-5 w-5 transition-colors duration-200 ${
                        focusedField === "subcategoryId" // <-- CHANGED to subcategoryId
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <select
                    name="subcategoryId" // <-- CHANGED to subcategoryId
                    value={formData.subcategoryId}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subcategoryId")} // <-- CHANGED to subcategoryId
                    onBlur={() => setFocusedField("")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                    disabled={areSubcategoriesLoading || isSubcategoriesFetching}
                  >
                    <option value="">
                      {areSubcategoriesLoading || isSubcategoriesFetching
                        ? "Loading subcategories..."
                        : "Select a subcategory"}
                    </option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
                {subcategories.length === 0 && !areSubcategoriesLoading && !isSubcategoriesFetching && (
                  <p className="text-sm text-orange-600 mt-2">
                    No subcategories found for this category.
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/restaurant/food-list")}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreatingFoodItem || categories.length === 0 || (formData.categoryId && subcategories.length === 0)} // <-- UPDATED
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isCreatingFoodItem ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaPlus className="mr-2" />
                    Create Food Item
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/restaurant/create-category")}
            className="bg-white border-2 border-orange-500 text-orange-600 py-3 px-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center justify-center animate-fade-in-delay"
            style={{ animationDelay: "600ms" }}
          >
            <FaTag className="mr-2" />
            Create Category
          </button>
          <button
            onClick={() => navigate("/restaurant/food-list")}
            className="bg-white border-2 border-gray-300 text-gray-600 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center animate-fade-in-delay"
            style={{ animationDelay: "700ms" }}
          >
            <FaUtensils className="mr-2" />
            View All Items
          </button>
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

export default CreateFoodItem;