import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar />
        <main className="p-4 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}