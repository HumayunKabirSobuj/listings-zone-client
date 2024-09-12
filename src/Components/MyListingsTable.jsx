/* eslint-disable react/prop-types */
export default function MyListingsTable({ myListings }) {
  
  return (
    <div>
      <div className="overflow-x-auto lg:pl-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl">
              <th>No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myListings.map((listing, idx) => (
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
                <td>{listing.ActiveStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
