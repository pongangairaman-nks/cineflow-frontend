"use client";

// app/dashboard/page.tsx
import React from "react";
import { Info, Play } from "lucide-react";
import ScrollableSection from "../../components/ScrollableSection";
import Image from "next/image";

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
  return (
    <div>
      <div className="h-[70vh] mx-[24px] bg-red-500 relative">
        <Image
          src="https://cineflow-videofiles.s3.ap-south-1.amazonaws.com/posters/1741603384744-squidgametrailerposter.jpg"
          alt="Featured"
          fill
          className="object-cover rounded-[8px] shadow-md"
          priority={false}
        />
        <div className="absolute left-[80px] bottom-[100px] text-white space-y-6 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
          {/* Title */}
          <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
            Lost In Space 2
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: 18 }}>A Netflix Original Series</p>

          {/* Buttons */}
          <div style={{ marginTop: "24px", display: "flex", gap: 16 }}>
            {/* Play Button */}
            <button
              style={{
                backgroundColor: "white",
                width: "160px",
                display: "flex",
                alignItems: "center",
                height: "48px",
                borderRadius: "4px"
              }}
            >
              <Play color="black" />
              <span style={{ color: "black", marginLeft: "8px" }}>Play</span>
            </button>

            {/* More Info Button */}
            <button
              style={{
                backgroundColor: "gray",
                width: "180px",
                display: "flex",
                alignItems: "center",
                height: "48px",
                borderRadius: "4px"
              }}
            >
              <Info className="w-5 h-5 stroke-white" />
              <span style={{ marginLeft: "8px" }}>More Info</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[40px]">
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
  );
}
