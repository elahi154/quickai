import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="w-full h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-gray-200 bg-white shrink-0">
        <img
          className="cursor-pointer w-32 sm:w-44"
          src={assets.logo}
          alt="logo"
          onClick={() => navigate("/")}
        />

        <button
          onClick={() => setSidebar(!sidebar)}
          className="sm:hidden p-1"
          aria-label="Toggle sidebar"
        >
          {sidebar ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </nav>

      {/* Main layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <main className="flex-1 min-w-0 overflow-y-auto bg-[#F4F7FB]">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen p-4">
      <SignIn />
    </div>
  );
};

export default Layout;