import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
