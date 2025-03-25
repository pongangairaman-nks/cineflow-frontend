import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Film,
  Tv,
  LogOut,
  Bookmark,
  Wallet,
  History,
  User
} from "lucide-react";

function SideBar() {
  const [activeItem, setActiveItem] = useState("Home");
  const router = useRouter();
  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard/home" },
    { icon: Film, label: "Movies", path: "/dashboard/movies" },
    { icon: Tv, label: "TV Shows", path: "/dashboard/tv-shows" },
    { icon: Bookmark, label: "Wishlist", path: "/dashboard/wishlist" },
    { icon: History, label: "Watch History", path: "/dashboard/watch-history" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
    { icon: Wallet, label: "Subscription", path: "/dashboard/subscription" }
  ];

  return (
    <div className="h-full min-h-screen w-[240px] left-0 top-0 bg-[#1E1E2E] py-6 flex flex-col z-10">
      <div className="flex items-center mb-10 px-[24px]">
        <div className="h-[64px] bg-white rounded-full flex items-center justify-center mr-3">
          <span className="text-black font-bold text-lg">CINEFLOW</span>
        </div>
      </div>
      <nav className="flex-grow">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => {
              setActiveItem(item.label);
              router.push(item.path);
            }}
            className={` mt-[12px]
              flex items-center w-full px-[16px] py-[8px] rounded-lg mb-2 transition-colors duration-200 cursor-pointer
              ${
                activeItem === item.label
                  ? "bg-[#6E44FF] text-white"
                  : "text-gray-400 hover:bg-[#2C2C3E] hover:text-white"
              }
            `}
          >
            <item.icon size={20} className="mr-3" />
            <span className="text-sm font-light ml-[16px]">{item.label}</span>
          </div>
        ))}
      </nav>
      <div
        className={` mt-[12px]
              flex items-center w-full px-[16px] py-[8px] rounded-lg mb-2 transition-colors duration-200 cursor-pointer
              text-gray-400 hover:bg-[#2C2C3E] hover:text-white
            `}
      >
        <LogOut size={20} className="mr-3" />
        <span className="text-sm font-light ml-[16px]">Logout</span>
      </div>
    </div>
  );
}

export default SideBar;
