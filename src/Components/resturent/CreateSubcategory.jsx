import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateSubcategoryMutation,
  useGetAllCategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
} from "../../redux/features/resturent/resturentApi";
import {
  FaTag,
  FaPlus,
  FaArrowLeft,
  FaList,
  FaLayerGroup,
} from "react-icons/fa";
import { FiFileText } from "react-icons/fi"; // Keep this import if you use the icon elsewhere, otherwise remove

const CreateSubcategory = () => {
  const navigate = useNavigate();
  const [createSubcategory, { isLoading }] = useCreateSubcategoryMutation();
  const { data: categoriesData } = useGetAllCategoriesQuery();

  const [formData, setFormData] = useState({
    name: "",
    // CHANGE THIS LINE: from 'category' to 'categoryId'
    categoryId: "", // This will hold the _id of the selected category
  });

  const [focusedField, setFocusedField] = useState("");

  const categories = categoriesData?.categories || [];

  // Use formData.categoryId here
  const { data: subcategoriesData, refetch: refetchSubcategories } =
    useGetSubcategoriesByCategoryQuery(formData.categoryId, { // Use categoryId here
      skip: !formData.categoryId, // Skip fetching if no category is selected
    });

  const subcategories = subcategoriesData?.subcategories || [];

  const handleChange = (e) => {
    // Make sure 'name' attribute in <select> matches 'categoryId'
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side Validation
    if (!formData.categoryId) { // Check formData.categoryId
      toast.error("Please select a parent category.");
      return;
    }
    if (formData.name.trim() === "") {
      toast.error("Please fill the Subcategory Name field.");
      return;
    }

    try {
      // Ensure category is a valid ID from the dropdown
      const selectedCategory = categories.find(
        (cat) => cat._id === formData.categoryId // Check formData.categoryId
      );
      if (!selectedCategory) {
        toast.error("Selected category is invalid. Please select from the list.");
        return;
      }

      // Send formData.categoryId in the payload
      await createSubcategory({
        name: formData.name,
        categoryId: formData.categoryId, // Send categoryId
      }).unwrap();

      toast.success("Subcategory created successfully!");
      setFormData({ name: "", categoryId: "" }); // Reset form with categoryId

      // Manually refetch subcategories for the *currently selected* category
      if (formData.categoryId) { // Check formData.categoryId
        refetchSubcategories();
      }
    } catch (error) {
      console.error("Failed to create subcategory:", error);
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
              Manage Subcategories
            </h1>
            <p className="text-gray-600">
              Create detailed subcategories for better menu organization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Subcategory Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <FaLayerGroup className="text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Create New Subcategory
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Parent Category */}
              <div
                className="animate-fade-in-delay"
                style={{ animationDelay: "200ms" }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Parent Category
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTag
                      className={`h-5 w-5 transition-colors duration-200 ${
                        focusedField === "categoryId" // Use categoryId here
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <select
                    name="categoryId" // Ensure name attribute is 'categoryId'
                    value={formData.categoryId} // Use formData.categoryId
                    onChange={handleChange}
                    onFocus={() => setFocusedField("categoryId")} // Use categoryId here
                    onBlur={() => setFocusedField("")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select a parent category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {categories.length === 0 && (
                  <p className="text-sm text-orange-600 mt-2">
                    No categories found. Please create a category first.
                  </p>
                )}
              </div>

              {/* Subcategory Name */}
              <div
                className="animate-fade-in-delay"
                style={{ animationDelay: "300ms" }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subcategory Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLayerGroup
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
                    placeholder="e.g., Spicy, Vegetarian, Gluten-Free"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || categories.length === 0}
                className="w-full bg-gradient-to-r from-purple-500 to-orange-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Subcategory...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaPlus className="mr-2" />
                    Create Subcategory
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Existing Subcategories */}
          <div
            className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <FaList className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Existing Subcategories
              </h2>
            </div>

            {/* Conditional rendering for subcategories list */}
            {!formData.categoryId ? ( // Check formData.categoryId
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLayerGroup className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Category Selected
                </h3>
                <p className="text-gray-600">
                  Select a parent category to view its subcategories.
                </p>
              </div>
            ) : subcategories.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLayerGroup className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No subcategories found for this category
                </h3>
                <p className="text-gray-600">
                  Create the first subcategory for the selected category.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {subcategories.map((subcategory, index) => (
                  <div
                    key={subcategory._id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 animate-fade-in-delay"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <FaLayerGroup className="text-purple-600 text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h4 className="font-semibold text-gray-800">
                            {subcategory.name}
                          </h4>
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {/* Assuming subcategory.category will still be populated by the backend */}
                            {subcategory.category?.name || "Unknown Category"}
                          </span>
                        </div>
                        {/* Display description if it still comes from the backend for existing subcategories */}
                        {subcategory.description && (
                          <p className="text-sm text-gray-600">
                            {subcategory.description}
                          </p>
                        )}
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
                  onClick={() => navigate("/restaurant/create-category")}
                  className="bg-orange-50 border border-orange-200 text-orange-600 py-3 px-4 rounded-xl font-semibold hover:bg-orange-100 transition-all duration-200 flex items-center justify-center"
                >
                  <FaTag className="mr-2" />
                  Create Category
                </button>
                <button
                  onClick={() => navigate("/restaurant/create-food")}
                  className="bg-purple-50 border border-purple-200 text-purple-600 py-3 px-4 rounded-xl font-semibold hover:bg-purple-100 transition-all duration-200 flex items-center justify-center"
                >
                  <FaPlus className="mr-2" />
                  Add Food Item
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div
          className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6 animate-fade-in-delay"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-purple-800">
                About Subcategories
              </h3>
              <p className="text-sm text-purple-700 mt-1">
                Subcategories help you organize items within main categories.
                For example, under "Main Course" you could have "Vegetarian",
                "Spicy", or "Chef's Special" subcategories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Corrected style tag */}
      <style>{`
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

export default CreateSubcategory;