import { createBrowserRouter } from "react-router-dom";
import LoginFormComponent from "./Pages/Login/LoginFormComponent";
import Registration from "./Pages/Registration/Registration";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardAnimation from "./Components/DashboardAnimation";
import CreateListings from "./Pages/CreateListings/CreateListings";
import PrivateRoute from "./Components/PrivateRoute";
import MyCreatedListings from "./Pages/MyCreatedListings/MyCreatedListings";
import ActiveListing from "./Pages/ActiveListings.jsx/ActiveListing";
import InActiveListings from "./Pages/InActiveListings/InActiveListings";
import EditListings from "./Pages/EditListings/EditListings";
import ManageListings from "./Pages/ManageListings/ManageListings";

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
      {
        path: "my-created-listings",
        element: <MyCreatedListings></MyCreatedListings>,
      },
      {
        path: "active-listings",
        element: <ActiveListing></ActiveListing>,
      },
      {
        path: "inactive-listings",
        element: <InActiveListings></InActiveListings>,
      },
      {
        path: "inactive-listings/editlisting/:id",
        element: <EditListings></EditListings>,
        loader: ({ params }) =>
          fetch(`https://listings-hub-server.vercel.app/listings/${params.id}`),
      },
      {
        path: "active-listings/editlisting/:id",
        element: <EditListings></EditListings>,
        loader: ({ params }) =>
          fetch(`https://listings-hub-server.vercel.app/listings/${params.id}`),
      },
      {
        path: "manage-listings",
        element: <ManageListings></ManageListings>,
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
