import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import InactiveListingsTable from "../../Components/InactiveListingsTable";

export default function InActiveListings() {
    const { user } = useContext(AuthContext);
    const axiosCommon = useAxiosCommon();
    const { data: AllListings = [], refetch } = useQuery({
      queryKey: ["listings"],
      queryFn: async () => {
        const res = await axiosCommon.get("/listings");
        return res.data;
      },
    });

    // Filter for the current user's listings
    const myListings = AllListings.filter(
      (listing) => listing.Creator === user?.email
    );

    // Filter for inactive listings
    const inactiveListings = myListings.filter(
      (listing) => listing.ActiveStatus === "inactive"
    );

    const handleDeleteContest = (listing) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosCommon.delete(`/listings/${listing._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              // Voice notification for successful deletion
              const msg = new SpeechSynthesisUtterance();
              msg.text = "Listing successfully deleted!";
              msg.lang = "en-US";
              msg.volume = 1; // Volume (0 to 1)
              msg.rate = 1; // Speed of the speech (0.1 to 10)
              msg.pitch = 1; // Pitch of the voice (0 to 2)
              window.speechSynthesis.speak(msg); // Trigger the speech synthesis

              refetch();
            }
          });
        }
      });
    };
  return (
    <div>
      <InactiveListingsTable
        handleDeleteContest={handleDeleteContest}
        inactiveListings={inactiveListings}
      ></InactiveListingsTable>
    </div>
  );
}
