import { useLoaderData, useNavigate } from "react-router-dom";
import EditListingModal from "../../Components/EditListingModal";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";

export default function EditListings() {
  const axiosCommon = useAxiosCommon();
  const loddedListing = useLoaderData();
  const { _id } = loddedListing;
  // console.log(loddedListing)
  const navigate = useNavigate();
  const HandleEditListings = (e) => {
    e.preventDefault();
    const form = e.target;
    const Name = form.name.value;
    const Description = form.description.value;
    const Photo = form.photo.value;

    const listingData = { Name, Description, Photo };
    console.log(listingData);

    axiosCommon.patch(`/listings/edit/${_id}`, listingData).then((res) => {
      // console.log(res.data)
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Listings Update Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // Voice notification for success
        const msg = new SpeechSynthesisUtterance();
        msg.text = "Successfully Updated Listings !";
        msg.lang = "en-US";
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 1;
        window.speechSynthesis.speak(msg);
        navigate("/my-created-listings");
      }
    });
  };
  return (
    <div>
      <EditListingModal
        loddedListing={loddedListing}
        HandleEditListings={HandleEditListings}
      ></EditListingModal>
    </div>
  );
}
