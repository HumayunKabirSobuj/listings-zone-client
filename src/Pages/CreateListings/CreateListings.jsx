
// import Swal from "sweetalert2";
// import CreateListingsModal from "../../Components/CreateListingsModal";
// import useAxiosCommon from "../../Hooks/useAxiosCommon";

// export default function CreateListings() {

//     const axiosCommon=useAxiosCommon();
   
//     const handleAddListings=(e)=>{
//         e.preventDefault()
//         const form=e.target;
//         const Name = form.name.value;
//         const Description = form.description.value;
//         const Photo = form.photo.value;
//         const Creator = form.creator.value;
//         const ActiveStatus='inactive';
//         const listingData = { Name, Description, Photo, Creator, ActiveStatus };

//         // console.table(listingData)
//         axiosCommon.post("/listings", listingData)
//         .then(res=>{
//           // console.log(res.data)
//           if(res.data.insertedId){
//             Swal.fire({
//               position: "top",
//               icon: "success",
//               title: "Listings Added Succesfully",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             form.reset()

            
//           }
//         })

        
//     }

//   return (
//     <div>
//       <CreateListingsModal
//         handleAddListings={handleAddListings}
//       ></CreateListingsModal>
//     </div>
//   );
// }


import Swal from "sweetalert2";
import CreateListingsModal from "../../Components/CreateListingsModal";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

export default function CreateListings() {
  const axiosCommon = useAxiosCommon();

  const handleAddListings = (e) => {
    e.preventDefault();
    const form = e.target;
    const Name = form.name.value;
    const Description = form.description.value;
    const Photo = form.photo.value;
    const Creator = form.creator.value;
    const ActiveStatus = "inactive";
    const listingData = { Name, Description, Photo, Creator, ActiveStatus };

    axiosCommon.post("/listings", listingData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Listings Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Voice notification for success
        const msg = new SpeechSynthesisUtterance();
        msg.text = "Successfully added Your Listings !";
        msg.lang = "en-US";
        msg.volume = 1; // Volume (0 to 1)
        msg.rate = 1; // Speed of the speech (0.1 to 10)
        msg.pitch = 1; // Pitch of the voice (0 to 2)
        msg.onend = () => form.reset(); // Reset the form after the message ends
        window.speechSynthesis.speak(msg); // Trigger the speech synthesis
      }
    });
  };

  return (
    <div>
      <CreateListingsModal
        handleAddListings={handleAddListings}
      ></CreateListingsModal>
    </div>
  );
}
