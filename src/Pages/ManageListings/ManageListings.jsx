import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
export default function ManageListings() {
  const axiosCommon = useAxiosCommon();
  const { data: AllListings = [] , refetch} = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const res = await axiosCommon.get("/listings");
      return res.data;
    },
  });

  const handleActive=(id)=>{
    // console.log(id)
    const updateListing = {
      ActiveStatus: "active",
    };
    axiosCommon.patch(`/listings/active/${id}`, updateListing)
    .then(res=>{
        // console.log(res.data)
        if(res.data.modifiedCount>0){
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Listings Approved Succesfully",
              showConfirmButton: false,
              timer: 1500,
            });
            const msg = new SpeechSynthesisUtterance();
            msg.text = "Listings Approved Succesfully !";
            msg.lang = "en-US";
            msg.volume = 1;
            msg.rate = 1;
            msg.pitch = 1;
            window.speechSynthesis.speak(msg);
            // navigate("/my-created-listings");
            refetch()
        }
    })
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-bold my-5">Manage Listings </h1>
      <div className="overflow-x-auto lg:px-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Photo</th>
              <th>Name</th>

              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {AllListings.map((listing, idx) => (
              <tr key={listing._id}>
                <th>{idx + 1}</th>
                <td>
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
                </td>
                <td>{listing.Name}</td>
                <td>
                  {listing.ActiveStatus === "active" ? (
                    <button disabled className="btn  btn-accent btn-sm ">
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActive(listing._id)}
                      className="btn btn-active btn-warning btn-sm"
                    >
                      Inactive
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
