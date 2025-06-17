import Addresses from "../Components/user/Addresses";
import Dashboard from "../Components/user/Dashboard";
import Favorites from "../Components/user/Favorites";
import Orders from "../Components/user/Orders";
import Settings from "../Components/user/Settings";

const userRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "orders",
    element: <Orders />,
  },
  {
    path: "addresses",
    element: <Addresses />,
  },
  {
    path: "favorites",
    element: <Favorites />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
];

export default userRoutes;
