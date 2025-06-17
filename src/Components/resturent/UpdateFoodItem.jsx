"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  useGetAllCategoriesQuery,
  useGetFoodItemByIdQuery,
  useGetSubcategoriesByCategoryQuery,
  useUpdateFoodItemMutation,
} from "../../redux/features/resturent/resturentApi"

const UpdateFoodItem = () => {
  const { foodId } = useParams()
  const navigate = useNavigate()

  const { data: categories } = useGetAllCategoriesQuery()
  const [selectedCategory, setSelectedCategory] = useState("")

  const { data: foodData, isLoading: isLoadingFood, error: foodError } = useGetFoodItemByIdQuery(foodId)

  const { data: subcategories } = useGetSubcategoriesByCategoryQuery(selectedCategory, {
    skip: !selectedCategory,
  })

  const [updateFoodItem, { isLoading: isUpdating }] = useUpdateFoodItemMutation()

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    categoryId: "",
    subcategoryId: "",
  })

  const [imagePreview, setImagePreview] = useState("")
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (foodData?.food) {
      const { name, price, description, imageUrl, categoryId, subcategoryId } = foodData.food
      setFormData({
        name,
        price,
        description,
        imageUrl,
        categoryId,
        subcategoryId,
      })
      setSelectedCategory(categoryId)
      setImagePreview(imageUrl)
    }
  }, [foodData])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Food name is required"
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.categoryId) newErrors.categoryId = "Category is required"
    if (!formData.subcategoryId) newErrors.subcategoryId = "Subcategory is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    if (name === "categoryId") {
      setSelectedCategory(value)
      setFormData((prev) => ({ ...prev, subcategoryId: "" }))
    }

    if (name === "imageUrl") {
      setImagePreview(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting")
      return
    }

    try {
      await updateFoodItem({ foodId, data: formData }).unwrap()
      toast.success("Food item updated successfully!")
      navigate("/restaurant/food/list")
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update food item")
    }
  }

  const handleCancel = () => {
    navigate("/restaurant/food-list")
  }

  if (isLoadingFood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading food item...</p>
        </div>
      </div>
    )
  }

  if (foodError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">Error loading food item</p>
          <button
            onClick={() => navigate("/restaurant/food-list")}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Update Food Item</h1>
              <p className="text-gray-600">Modify your food item details</p>
            </div>
            <button onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              ← Back to Food List
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Restaurant</span>
            <span>→</span>
            <span>Food Management</span>
            <span>→</span>
            <span className="text-orange-600 font-medium">Update Food Item</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Category *</label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 ${
                        errors.categoryId ? "border-red-500" : "border-gray-200"
                      }`}
                    >
                      <option value="">Select Category</option>
                      {categories?.categories?.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.categoryId && <p className="text-red-500 text-sm animate-shake">{errors.categoryId}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Subcategory *</label>
                    <select
                      name="subcategoryId"
                      value={formData.subcategoryId}
                      onChange={handleChange}
                      disabled={!selectedCategory}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 ${
                        !selectedCategory ? "bg-gray-100 cursor-not-allowed" : ""
                      } ${errors.subcategoryId ? "border-red-500" : "border-gray-200"}`}
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories?.subcategories?.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                    {errors.subcategoryId && (
                      <p className="text-red-500 text-sm animate-shake">{errors.subcategoryId}</p>
                    )}
                  </div>
                </div>

                {/* Food Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Food Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter food name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm animate-shake">{errors.name}</p>}
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 ${
                      errors.price ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.price && <p className="text-red-500 text-sm animate-shake">{errors.price}</p>}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Description *</label>
                  <textarea
                    name="description"
                    placeholder="Describe your food item..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 resize-none ${
                      errors.description ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.description && <p className="text-red-500 text-sm animate-shake">{errors.description}</p>}
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isUpdating ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Updating...
                      </div>
                    ) : (
                      "Update Food Item"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transform hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-up animation-delay-200 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>

              <div className="space-y-4">
                {/* Image Preview */}
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Food preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=200&width=200"
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🍽️</div>
                        <p className="text-sm">No image</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Food Details */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">{formData.name || "Food Name"}</h4>
                    <p className="text-2xl font-bold text-orange-600">${formData.price || "0.00"}</p>
                  </div>

                  <p className="text-gray-600 text-sm">
                    {formData.description || "Food description will appear here..."}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {formData.categoryId && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        {categories?.categories?.find((cat) => cat._id === formData.categoryId)?.name || "Category"}
                      </span>
                    )}
                    {formData.subcategoryId && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        {subcategories?.subcategories?.find((sub) => sub._id === formData.subcategoryId)?.name ||
                          "Subcategory"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default UpdateFoodItem
