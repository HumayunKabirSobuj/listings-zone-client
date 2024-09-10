import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";

export default function Registration() {

  

  const [showPassword, setShowPassword] = useState(false);

  const axiosCommon = useAxiosCommon();

  const { data: AllUsers = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosCommon.get("/users");
      return res.data;
    },
  });

  // console.log(users)
  


  const navigate = useNavigate();
  const { createUser, updateUserProfile, googleLogin, logOut, loading } =
    useContext(AuthContext);
  const handleRegister = async (e) => {

    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    try {
      const result = await createUser(email, password);
      console.log(result);
      await updateUserProfile(name, photo);
      
      const findEmail = AllUsers.find((user) => user?.email === email);
      if(findEmail){
        return toast.error('User Already Exists')
      }
      else{
        const userInfo = {
          name: name,
          email: email,
          role: "user",
        };

        axiosCommon.post("/users", userInfo).then((res) => {
          console.log(res.data);
          toast.success("Registration Succesfully");
          logOut();
          navigate("/login");
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);

       
        const findEmail = AllUsers.find(
          (user) => user?.email === result?.user?.email
        );
        if (findEmail) {
          
          toast.success("Logged in successfully");
          navigate("/"); 
        } else {
         
          const userInfo = {
            name: result?.user?.displayName,
            email: result?.user?.email,
            role: "user",
          };

          axiosCommon.post("/users", userInfo).then((res) => {
            console.log(res.data);
            toast.success("Google Registration Successfully");
            navigate("/"); 
          });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="lg:w-1/3 mx-auto mt-10 max-md:px-5">
      <h1 className="font-bold text-2xl  text-center mb-5">Register Here</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <label className="input input-bordered flex items-center gap-2   w-full  bg-[#f1f1f1] hover:rounded-none hover:border-none border-none rounded-none">
          <span className="text-[#a7a3b5]">Name </span>
          <input type="text" name="name" className="grow" />
        </label>

        <label className="input input-bordered flex items-center gap-2   w-full  bg-[#f1f1f1] hover:rounded-none hover:border-none border-none rounded-none">
          <span className="text-[#a7a3b5]"> Email </span>

          <input type="email" name="email" className="grow" />
        </label>

        <label className="input input-bordered flex items-center gap-2   w-full  bg-[#f1f1f1] hover:rounded-none hover:border-none border-none rounded-none">
          <span className="text-[#a7a3b5]">Photo URL </span>

          <input type="url" name="photo" className="grow" />
        </label>

        <label className="input input-bordered flex items-center gap-2   w-full  bg-[#f1f1f1] hover:rounded-none hover:border-none border-none rounded-none">
          <span className="text-[#a7a3b5]"> Password </span>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="grow"
          />
          <kbd className="kbd kbd-sm">
            <p onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </p>
          </kbd>
        </label>

        <input
          type="submit"
          value="Register"
          className="btn bg-[#303030] text-white w-full rounded-t-none rounded-b-xl"
        />
      </form>
      <button
        disabled={loading}
        onClick={handleGoogleSignIn}
        className="btn bg-[#303030] w-full text-white  rounded-b-xl rounded-t-none hover:bg-[#303030] my-2"
      >
        {loading ? (
          <TbFidgetSpinner className="animate-spin m-auto"></TbFidgetSpinner>
        ) : (
          "Login With Google"
        )}
      </button>
      <Link
        to={"/"}
        className="btn btn-sm bg-[#303030] w-full text-white  rounded-b-xl rounded-t-none hover:bg-[#303030]"
      >
        Already Have an Account ! Go to Login Page...
      </Link>
    </div>
  );
}
