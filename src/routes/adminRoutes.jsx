// src/routes/adminRoutes.js
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddResturent from "../Components/admin/AddResturent";
import ShowAllRestaurants from "../Components/admin/ShowAllRestaurants";
import EditRestaurant from "../Components/admin/EditRestaurant";
import ShowAllUser from "../Components/admin/ShowAllUser";

const adminRoutes = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "add-resturent",
    element: <AddResturent/>,
  },
  {
    path: "showAllRestaurants",
    element: <ShowAllRestaurants/>,
  },
  {
    path: "edit-restaurant/:id",
    element: <EditRestaurant/>,
  },
  {
    path: "showAllUsers",
    element: <ShowAllUser/>,
  },
];

export default adminRoutes;
