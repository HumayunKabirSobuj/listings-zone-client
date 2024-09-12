/* eslint-disable react/prop-types */
import { FaEdit } from "react-icons/fa";
import { GiSightDisabled } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function InactiveListingsTable({ handleDeleteContest, inactiveListings }) {
  return (
    <div>
      <div>
        <div className="overflow-x-auto lg:pl-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="lg:text-lg">
                <th>No</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inactiveListings.map((listing, idx) => (
                <tr key={listing._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-16 rounded">
                        <img
                          src={listing?.Photo}
                          alt="Tailwind-CSS-Avatar-component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{listing.Name}</td>
                  <td className="lg:text-3xl">
                    <GiSightDisabled />
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
    </div>
  );
}
