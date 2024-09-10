/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateListingsModal({ handleAddListings }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically show modal when component is loaded
    document.getElementById("my_modal_2").showModal();
  }, []);

  const handleClose = () => {
    // Close the modal
    document.getElementById("my_modal_2").close();
    // Navigate to /dashboard
    navigate("/");
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

          <h3 className="font-bold text-lg mb-4">Create New Listing</h3>

          <form onSubmit={handleAddListings} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="name"
                placeholder="Enter listing title"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter listing description"
                className="textarea textarea-bordered w-full"
                rows="4"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="select select-bordered w-full" required>
                <option disabled selected>
                  Select category
                </option>
                <option>Real Estate</option>
                <option>Automobile</option>
                <option>Jobs</option>
                <option>Services</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
