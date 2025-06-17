import CreateCategory from "../Components/resturent/CreateCategory.jsx";
import CreateFoodItem from "../Components/resturent/CreateFoodItem.jsx";
import CreateSubcategory from "../Components/resturent/CreateSubcategory.jsx";
import FoodList from "../Components/resturent/FoodList.jsx";
import Showinfo from "../Components/resturent/Showinfo.jsx";
import UpdateFoodItem from "../Components/resturent/UpdateFoodItem.jsx";
import UpdateInfo from "../Components/resturent/updateinfo.jsx";
import RestaurantDashboard from "../pages/RestaurantDashboard.jsx";

const restaurantRoutes = [
  {
    path: "dashboard",
    element: <RestaurantDashboard />,
  },
  {
    path: "me",
    element: <Showinfo />,
  },
  {
    path: "update-food/:foodId", // ✅ Now matches your URL
    element: <UpdateFoodItem />,
  },
  {
    path: "update-info",
    element: <UpdateInfo />,
  },

  {
    path: "menu/create-category",
    element: <CreateCategory />,
  },
  {
    path: "menu/create-subcategory",
    element: <CreateSubcategory />,
  },
  {
    path: "menu/create-food",
    element: <CreateFoodItem />,
  },
  {
    path: "food/list",
    element: <FoodList />,
  },
];

export default restaurantRoutes;
