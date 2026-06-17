import { useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [userPlan, setUserPlan] = useState("free");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        setUserPlan(data.plan);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };

    fetchPlan();
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {sidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebar(false)}
        />
      )}

      <aside
        className={`
          fixed md:static
          top-1 left-0 bottom-0
          z-40
          w-60 bg-white border-r border-gray-200
          flex flex-col justify-between
          overflow-y-auto
          transition-transform duration-300 ease-in-out

          ${
            sidebar ? "translate-x-0" : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >
        <div className="my-7 w-full">
          <img
            src={user?.imageUrl}
            alt="user avatar"
            className="w-14 h-14 rounded-full mx-auto object-cover"
          />

          <h1 className="mt-2 text-center font-medium px-4 truncate">
            {user?.fullName}
          </h1>

          <div className="px-4 mt-5 text-sm text-gray-600 font-medium">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/ai"}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 flex items-center gap-3 rounded-lg mb-1 transition-colors duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="w-full border-t border-gray-200 p-4 px-6 flex items-center justify-between">
          <div
            onClick={openUserProfile}
            className="flex gap-3 items-center cursor-pointer min-w-0"
          >
            <img
              src={user?.imageUrl}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />

            <div className="min-w-0">
              <h1 className="text-sm font-medium truncate">
                {user?.fullName}
              </h1>

              <p className="text-xs text-gray-500 capitalize">
                Plan: {userPlan}
              </p>
            </div>
          </div>

          <LogOut
            onClick={signOut}
            className="w-5 h-5 text-gray-400 hover:text-gray-700 transition cursor-pointer shrink-0"
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;