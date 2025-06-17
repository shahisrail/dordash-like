// src/routes/publicRoutes.js
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Resturents from "../Components/public/Resturents";
import Menu from "../Components/public/Menu";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
  { path: "/resturent", element: <Resturents /> },
  { path: "/menu/:restaurantId", element: <Menu /> },
];

export default publicRoutes;
