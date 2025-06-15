import { createBrowserRouter } from "react-router-dom";
import { getUserRole } from "../utils/auth";

import AdminLayout from "../layouts/AdminLayout";
import RestaurantLayout from "../layouts/RestaurantLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Main from "../layouts/Main";

const role = getUserRole();

let mainElement;
if (role === "admin") mainElement = <AdminLayout />;
else if (role === "restaurant") mainElement = <RestaurantLayout />;
else mainElement = <Main />;

export const router = createBrowserRouter([
  {
    path: "/",
    element: mainElement,

    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);
