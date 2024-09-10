import { useRef, useState, useEffect, useContext } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "rive-react";
import "./LoginFormComponent.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";

const STATE_MACHINE_NAME = "Login Machine";
const LOGIN_PASSWORD = "teddy";
const LOGIN_TEXT = "Login";

/**
 * Use case for a simple login experience that incorporates a Rive asset with a
 * state machine to coordinate user interaction with a form
 */
const LoginFormComponent = (riveProps = {}) => {
  const axiosCommon = useAxiosCommon();
    const { data: AllUsers = [] } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosCommon.get("/users");
        return res.data;
      },
    });

  const navigate = useNavigate();
  const { signIn, googleLogin, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { rive: riveInstance, RiveComponent } = useRive({
    src: "login-teddy.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    ...riveProps,
  });
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
  const [loginButtonText, setLoginButtonText] = useState(LOGIN_TEXT);
  const inputRef = useRef(null);

  const isCheckingInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    "isChecking"
  );
  const numLookInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    "numLook"
  );
  const trigSuccessInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    "trigSuccess"
  );
  const trigFailInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    "trigFail"
  );
  const isHandsUpInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    "isHandsUp"
  );

  // Divide the input width by the max value the state machine looks for in numLook.
  // This gets us a multiplier we can apply for each character typed in the input
  // to help Teddy track progress along the input line
  useEffect(() => {
    if (inputRef?.current && !inputLookMultiplier) {
      setInputLookMultiplier(inputRef.current.offsetWidth / 100);
    }
  }, [inputRef]);

  // As the user types in the username box, update the numLook value to let Teddy know
  // where to look to according to the state machine
  const onUsernameChange = (e) => {
    const newVal = e.target.value;
    setUserValue(newVal);
    if (!isCheckingInput.value) {
      isCheckingInput.value = true;
    }
    const numChars = newVal.length;
    numLookInput.value = numChars * inputLookMultiplier;
  };

  // Start Teddy looking in the correct spot along the username input
  const onUsernameFocus = () => {
    isCheckingInput.value = true;
    if (numLookInput.value !== userValue.length * inputLookMultiplier) {
      numLookInput.value = userValue.length * inputLookMultiplier;
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


  // When submitting, simulate password validation checking and trigger the appropriate input from the
  // state machine
  const onSubmit = async (e) => {
    setLoginButtonText("Checking...");
    setTimeout(() => {
      setLoginButtonText(LOGIN_TEXT);
      passValue === LOGIN_PASSWORD
        ? trigSuccessInput.fire()
        : trigFailInput.fire();
    }, 1500);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.table(email, password);
    try {
      const result = await signIn(email, password);
      console.log(result);
      toast.success("Registration Succesfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }

    
    return false;
  };

  return (
    <div className="login-form-component-root">
      <div className="login-form-wrapper">
        <div className="rive-wrapper">
          <RiveComponent className="rive-container" />
        </div>
        <div className="form-container">
          <form onSubmit={onSubmit} className="space-y-3 mb-3">
            <label>
              <input
                type="text"
                className="form-username"
                name="email"
                placeholder="Email"
                onFocus={onUsernameFocus}
                value={userValue}
                onChange={onUsernameChange}
                onBlur={() => (isCheckingInput.value = false)}
                ref={inputRef}
              />
            </label>
            <label className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-pass"
                name="password"
                placeholder="Enter Your Password"
                value={passValue}
                onFocus={() => (isHandsUpInput.value = true)}
                onBlur={() => (isHandsUpInput.value = false)}
                onChange={(e) => setPassValue(e.target.value)}
              />
              <kbd className="kbd kbd-sm absolute top-3 right-5">
                <p onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </p>
              </kbd>
            </label>
            <button className="login-btn">{loginButtonText}</button>
          </form>

          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="btn bg-[#303030] w-full text-white  rounded-b-xl rounded-t-none hover:bg-[#303030] mb-2"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto"></TbFidgetSpinner>
            ) : (
              "Login With Google"
            )}
          </button>

          <Link
            to={"/register"}
            className="btn btn-sm bg-[#303030] w-full text-white  rounded-b-xl rounded-t-none hover:bg-[#303030]"
          >
            New Here ! Go to Registration Page ...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginFormComponent;
