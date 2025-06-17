import React from "react";
import { toast } from "react-toastify"; // ✅ import toast
import { useDeleteFoodItemMutation } from "../../redux/features/resturent/resturentApi";

const DeleteFoodModal = ({ food, onClose }) => {
  const [deleteFood] = useDeleteFoodItemMutation();

  const handleDelete = async () => {
    try {
      await deleteFood(food._id).unwrap();
      toast.success(`${food.name} has been deleted successfully! ✅`); // ✅ toast
      onClose();
    } catch (error) {
      console.error("Failed to delete food:", error);
      toast.error("Failed to delete food. ❌"); // ✅ optional error toast
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete <strong>{food.name}</strong>?
        </p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFoodModal;
