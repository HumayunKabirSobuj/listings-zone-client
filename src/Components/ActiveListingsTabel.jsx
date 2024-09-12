/* eslint-disable react/prop-types */

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { Link } from "react-router-dom";

export default function ActiveListingsTabel({ activeListings, handleDeleteContest }) {
  return (
    <div>
      <div className="overflow-x-auto max-w-[90%] mx-auto lg:pl-10">
        <table className="table bg-yellow-100">
          {/* head */}
          <thead>
            <tr className="lg:text-lg border-gray-800 border-2">
              <th>No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeListings.map((listing, idx) => (
              <tr key={listing._id} className="border-2 border-gray-900">
                <th>{idx + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img
                        src={listing?.Photo}
                        alt="Tailwind-CSS-Avatar-component"
                      />
                    </div>
                  </div>
                </td>
                <td>{listing.Name}</td>
                <td className="lg:text-3xl">
                  <SiTicktick />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="lg:text-3xl  font-bold">
                      <div className="tooltip" data-tip="Edit">
                        <Link to={`editlisting/${listing._id}`}>
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                    <div className="lg:text-3xl font-bold">
                      <div className="tooltip" data-tip="Delete">
                        <button onClick={() => handleDeleteContest(listing)}>
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



