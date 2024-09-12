/* eslint-disable react/prop-types */
export default function MyListingsTable({ myListings }) {
  
  return (
    <div>
      <div className="overflow-x-auto max-w-[90%] mx-auto lg:pl-10  ">
        <table className="table bg-yellow-100">
          {/* head */}
          <thead>
            <tr className="lg:text-lg border-gray-800 border-2">
              <th>No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myListings.map((listing, idx) => (
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
                <td>{listing.ActiveStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
