import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AdminLayout from "../layouts/AdminLayout";
import RestaurantLayout from "../layouts/RestaurantLayout";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";
 
import restaurantRoutes from "./restaurantRoutes";
import ProtectedRoute from "../utils/ProtectedRoute";
import UserLayout from "../layouts/UserLayout";
import userRoutes from "./userRoutes";
 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: publicRoutes,
  },

  {
    path: "/user",
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        path: "",
        element: <UserLayout />,
        children: userRoutes,
      },
    ],
  },
  
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "", // 👈 don't use `/admin` again, it's already inherited
        element: <AdminLayout />,
        children: adminRoutes, // these should now use relative paths
      },
    ],
  },

  {
    path: "/restaurant",
    element: <ProtectedRoute allowedRoles={["restaurant"]} />,
    children: [
      {
        path: "", // 👈 same for restaurant
        element: <RestaurantLayout />,
        children: restaurantRoutes,
      },
    ],
  },
]);
