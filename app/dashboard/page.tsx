"use client";

// app/dashboard/page.tsx
import React, { useState } from "react";
import {
  Home,
  Film,
  Tv,
  Star,
  Settings,
  LogOut,
  Bell,
  Layers,
  Bookmark
} from "lucide-react";
import { Search, Mic, User } from "lucide-react";
import SearchInput from "../../components/SearchComponent";
import ScrollableSection from "../../components/ScrollableSection";
const recommendedShows = [
  {
    title: "Money Heist Season 5",
    image: "/movie-image.jpg"
  },
  {
    title: "Dark",
    image: "/api/placeholder/300/450?text=Dark"
  },
  {
    title: "Sacred Games",
    image: "/api/placeholder/300/450?text=Sacred+Games"
  },
  {
    title: "Sabrina",
    image: "/api/placeholder/300/450?text=Sabrina"
  },
  {
    title: "Portrait",
    image: "/api/placeholder/300/450?text=Portrait"
  },
  {
    title: "Sex Education",
    image: "/api/placeholder/300/450?text=Sex+Education"
  },
  {
    title: "Queen's Gambit",
    image: "/api/placeholder/300/450?text=Queens+Gambit"
  },
  {
    title: "Money Heist Season 5",
    image: "/movie-image.jpg"
  },
  {
    title: "Dark",
    image: "/api/placeholder/300/450?text=Dark"
  },
  {
    title: "Sacred Games",
    image: "/api/placeholder/300/450?text=Sacred+Games"
  },
  {
    title: "Sabrina",
    image: "/api/placeholder/300/450?text=Sabrina"
  },
  {
    title: "Portrait",
    image: "/api/placeholder/300/450?text=Portrait"
  },
  {
    title: "Sex Education",
    image: "/api/placeholder/300/450?text=Sex+Education"
  },
  {
    title: "Queen's Gambit",
    image: "/api/placeholder/300/450?text=Queens+Gambit"
  }
];

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState("Home");

  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: Film, label: "Movies" },
    { icon: Tv, label: "TV Shows" },
    { icon: Layers, label: "Series" },
    { icon: Star, label: "My Favorites" },
    { icon: Bookmark, label: "Wishlist" },
    { icon: Settings, label: "Settings" }
  ];

  return (
    <div className="flex h-screen bg-[#14171F] bg-[url('/path-to-image.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[url('/bg-image.jpg')] bg-cover bg-center opacity-50 w-[100vw] h-[100vh] pointer-events-none"></div>

      {/* Sidebar */}
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
              onClick={() => setActiveItem(item.label)}
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

      {/* Main Content */}
      <div className="h-full flex-1 overflow-y-auto">
        <div>
          <nav className="flex items-center justify-end px-[16px] py-[16px]">
            <div className="mr-[16px] flex items-center bg-[#2C2C3E] px-[16px] py-2 w-1/3 rounded-[4px] h-10">
              <Search className="text-gray-400 mr-3" size={20} />
              <SearchInput />
              <Mic className="text-gray-400 ml-3" size={20} />
            </div>

            <div className="flex items-center px-3 py-2 rounded-[4px] h-10">
              <button className="mr-[16px] text-white p-2 bg-[#2C2C3E]">
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                  <Bell size={20} />
                </div>
              </button>
              <button className="text-white p-2 bg-[#2C2C3E]">
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                  <User size={20} />
                </div>
              </button>
            </div>
          </nav>
        </div>
        <div>
          <ScrollableSection
            title={"Recommended for you"}
            data={recommendedShows}
          />
        </div>
        <div className="mt-[40px]">
          <ScrollableSection title={"Trending Now"} data={recommendedShows} />
        </div>
        <div className="mt-[40px]">
          <ScrollableSection title={"Movies"} data={recommendedShows} />
        </div>
        <div className="mt-[40px]">
          <ScrollableSection title={"TV Shows"} data={recommendedShows} />
        </div>
      </div>
    </div>
  );
}
