import { useContext, useState } from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoCreateOutline, IoLogOut } from "react-icons/io5";
import { MdAirplanemodeActive, MdOutlineAirplanemodeInactive, MdOutlineManageHistory } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

export default function Sidebar() {
  const {logOut}=useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="flex z-50">
      {/* Mobile Button */}
      <button className="md:hidden p-4" onClick={toggleSidebar}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#f3f4f6] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-50`}
      >
        <button
          className="absolute top-4 right-4 text-white lg:hidden"
          onClick={closeSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <nav className="max-md:mt-10 flex flex-col justify-evenly max-md:max-h-screen h-screen">
          <div>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                }`
              }
            >
              <BsGraphUp className="w-5 h-5" />

              <span className="mx-4 font-medium">Dashboard</span>
            </NavLink>

            {/* User Dashboard */}

            <NavLink
              to="create-new-listings"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                }`
              }
            >
              <IoCreateOutline className="w-5 h-5" />

              <span className="mx-4 font-medium">Create New Listings</span>
            </NavLink>
            <NavLink
              to="my-created-listings"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                }`
              }
            >
              <IoCreateOutline className="w-5 h-5" />

              <span className="mx-4 font-medium">My Created Listings</span>
            </NavLink>

            <NavLink
              to="active-listings"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                }`
              }
            >
              <MdAirplanemodeActive className="w-5 h-5" />

              <span className="mx-4 font-medium">Active Listings</span>
            </NavLink>

            <NavLink
              to="inactive-listings"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                }`
              }
            >
              <MdOutlineAirplanemodeInactive className="w-5 h-5" />

              <span className="mx-4 font-medium">Inactive Listings</span>
            </NavLink>

            {/* Admin Dashboard */}

            <NavLink
              to="manage-listings"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                }`
              }
            >
              <MdOutlineManageHistory className="w-5 h-5" />

              <span className="mx-4 font-medium">Manage Listings</span>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                }`
              }
            >
              <FaUser className="w-5 h-5" />

              <span className="mx-4 font-medium">Profile</span>
            </NavLink>
            <Link
              onClick={logOut}
              className="flex items-start px-4 py-2 my-5  bg-red-400"
             
            >
              <IoLogOut className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

