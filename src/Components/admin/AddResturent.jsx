"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useAddRestaurantMutation } from "../../Redux/features/admin/adminApi";
import {
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaPlus,
} from "react-icons/fa";

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    ownerName: "",
    password: "",
  });

  const [addRestaurant, { isLoading }] = useAddRestaurantMutation();
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    for (const key in formData) {
      if (formData[key].trim() === "") {
        toast.error(`Please fill the ${key} field.`);
        return;
      }
    }

    try {
      await addRestaurant(formData).unwrap();
      toast.success("Restaurant added successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        ownerName: "",
        password: "",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const formFields = [
    { name: "name", label: "Restaurant Name", icon: FaStore, type: "text" },
    { name: "email", label: "Email Address", icon: FaEnvelope, type: "email" },
    { name: "phone", label: "Phone Number", icon: FaPhone, type: "tel" },
    { name: "address", label: "Address", icon: FaMapMarkerAlt, type: "text" },
    { name: "ownerName", label: "Owner Name", icon: FaUser, type: "text" },
    { name: "password", label: "Password", icon: FaLock, type: "password" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <FaPlus className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Restaurant
          </h1>
          <p className="text-gray-600">
            Create a new restaurant account in the system
          </p>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                    {field.label}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon
                        className={`h-5 w-5 transition-colors duration-200 ${
                          focusedField === field.name
                            ? "text-blue-500"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      required
                    />
                  </div>
                </div>
              );
            })}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Restaurant...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaPlus className="mr-2" />
                    Add Restaurant
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div
          className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fade-in-delay"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Important Note
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                The restaurant owner will receive login credentials via email.
                Make sure the email address is correct.
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

export default AddRestaurant;
