"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetMyRestaurantQuery,
  useUpdateMyRestaurantMutation,
} from "../../redux/features/resturent/resturentApi";
import {
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

const UpdateInfo = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyRestaurantQuery();
  const [updateMyRestaurant, { isLoading: isUpdating }] =
    useUpdateMyRestaurantMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    ownerName: "",
  });

  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    if (data?.restaurant) {
      const { name, email, phone, address, ownerName } = data.restaurant;
      setFormData({ name, email, phone, address, ownerName });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMyRestaurant(formData).unwrap();
      toast.success("Restaurant info updated successfully!");
      navigate("/restaurant/me");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update info");
    }
  };

  const formFields = [
    { name: "name", label: "Restaurant Name", icon: FaStore, type: "text" },
    { name: "email", label: "Email Address", icon: FaEnvelope, type: "email" },
    { name: "phone", label: "Phone Number", icon: FaPhone, type: "tel" },
    { name: "address", label: "Address", icon: FaMapMarkerAlt, type: "text" },
    { name: "ownerName", label: "Owner Name", icon: FaUser, type: "text" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurant data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 animate-fade-in">
          <button
            onClick={() => navigate("/restaurant/me")}
            className="mr-4 p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Update Restaurant Info
            </h1>
            <p className="text-gray-600">Modify your restaurant details</p>
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
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      required
                    />
                  </div>
                </div>
              );
            })}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/restaurant/me")}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isUpdating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaSave className="mr-2" />
                    Update Info
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div
          className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4 animate-fade-in-delay"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">
                Important Note
              </h3>
              <p className="text-sm text-orange-700 mt-1">
                Changes to your restaurant information will be reflected across
                the platform immediately.
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

export default UpdateInfo;
