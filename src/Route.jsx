import { createBrowserRouter } from "react-router-dom";
import LoginFormComponent from "./Pages/Login/LoginFormComponent";
import Registration from "./Pages/Registration/Registration";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardAnimation from "./Components/DashboardAnimation";
import CreateListings from "./Pages/CreateListings/CreateListings";
import PrivateRoute from "./Components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardAnimation></DashboardAnimation>,
      },
      {
        path: "create-new-listings",
        element: <CreateListings></CreateListings>,
      },
    ],
  },

  {
    path: "/register",
    element: <Registration></Registration>,
  },
  {
    path: "/login",
    element: <LoginFormComponent></LoginFormComponent>,
  },
]);
