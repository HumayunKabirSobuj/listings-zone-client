import { Player } from "@lottiefiles/react-lottie-player";

const OpenningDashbard = () => {
  return (
    <div>
      <div className="max-md:hidden lg:flex lg:justify-center lg:items-center  w-full h-full">
        <Player
          autoplay
          loop
          src="https://lottie.host/fc5cc72a-9b5e-44e9-b2ac-b4ddb7f575ff/mvzy4d9kQi.json"
          style={{ height: "600px", width: "500px" }}
        ></Player>
      </div>
      <div className="flex lg:hidden items-center justify-center h-screen">
        <div className="flex lg:hidden items-center">
          <h1 className="text-2xl font-bold mt-10">Welcome To Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default OpenningDashbard;
