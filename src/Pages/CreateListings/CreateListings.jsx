import { useContext } from "react"
import { AuthContext } from "../../provider/AuthProvider";
import CreateListingsModal from "../../Components/CreateListingsModal";

export default function CreateListings() {

    const {user}=useContext(AuthContext);
   
    const handleAddListings=(e)=>{
        e.preventDefault()
        const form=e.target;
        const listingsName = form.name.value;
        console.log(listingsName);
    }

  return (
    <div>
      <CreateListingsModal
        handleAddListings={handleAddListings}
      ></CreateListingsModal>
    </div>
  );
}
