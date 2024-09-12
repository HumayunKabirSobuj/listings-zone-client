/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

export default function EditListingModal({ loddedListing, HandleEditListings }) {
  const { Name, Description, Photo } = loddedListing;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Automatically show modal when component is loaded
    document.getElementById("my_modal_2").showModal();
  }, []);

  const handleClose = () => {
    // Close the modal
    document.getElementById("my_modal_2").close();
    // Navigate to /dashboard
    navigate("/my-created-listings");
  };
  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box relative">
          {/* Close Button at the Top-Right Corner */}
          <button
            type="button"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg mb-4 text-center">
            Update Your Listing
          </h3>

          <form onSubmit={HandleEditListings} className="space-y-4">
            {/* Title */}
            <div>
              <label className="input input-bordered flex items-center gap-2   w-full  bg-[#f1f1f1] hover:rounded-none hover:border-none border-none rounded-none">
                <span className="text-[#a7a3b5]">Name </span>
                <input
                  defaultValue={Name}
                  type="text"
                  name="name"
                  className="grow"
                />
              </label>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 w-full bg-[#f1f1f1] hover:rounded-none hover:border-none border-none rounded-none">
                <span className="text-[#a7a3b5] pl-3">Description</span>
                <textarea
                  defaultValue={Description}
                  name="description"
                  className="textarea textarea-md bg-[#f1f1f1] border-none w-full resize-none focus:outline-none focus:ring-0"
                ></textarea>
              </label>
            </div>

            {/* Photo URL */}
            <div>
              <label className="input input-bordered flex items-center gap-2   w-full  bg-[#f1f1f1] hover:rounded-none hover:border-none border-none rounded-none">
                <span className="text-[#a7a3b5]">Photo URL </span>
                <input
                  defaultValue={Photo}
                  type="url"
                  name="photo"
                  className="grow"
                />
              </label>
            </div>

            {/* Creator*/}
            <div>
              <label className="input input-bordered flex items-center gap-2   w-full  bg-[#f1f1f1] hover:rounded-none hover:border-none border-none rounded-none">
                <span className="text-[#a7a3b5]">Creator</span>
                <input
                  type="text"
                  defaultValue={user?.email}
                  disabled
                  name="creator"
                  className="grow"
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <input
                type="submit"
                className="btn bg-yellow-200 max-md:w-full w-1/3"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
