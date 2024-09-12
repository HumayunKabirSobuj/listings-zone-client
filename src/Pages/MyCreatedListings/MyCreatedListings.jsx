import { useQuery } from "@tanstack/react-query";
import MyListingsTable from "../../Components/MyListingsTable";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export default function MyCreatedListings() {
    const {user}=useContext(AuthContext)
  const axiosCommon = useAxiosCommon();
  const { data: AllListings = [] } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const res = await axiosCommon.get("/listings");
      return res.data;
    },
  });

//   console.log(AllListings)

const myListings = AllListings.filter((listing) => listing.Creator === user?.email);
// console.log("my Listings : ", myListings)

  return (
    <div>
      <h1 className="text-2xl text-center my-5">My Listings Here</h1>
      <MyListingsTable myListings={myListings}></MyListingsTable>
    </div>
  );
}
