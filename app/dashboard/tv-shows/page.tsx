"use client";

// app/dashboard/page.tsx
import React from "react";
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
    title: "Money Heist Season 5",
    image: "/movie-image.jpg"
  },
  {
    title: "Dark",
    image: "/api/placeholder/300/450?text=Dark"
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

export default function TvShowsPage() {
  return (
    <div>
      <div className="px-[80px]">
        <h2
          className="text-white mb-6"
          style={{ fontSize: 24, fontWeight: "bold" }}
        >
          TV Shows
        </h2>
      </div>
      <div className="mt-[20px] flex flex-wrap gap-[40px] justify-center">
        {recommendedShows.map((show, index) => (
          <div
            key={index}
            className="w-[180px] h-[240px] cursor-pointer hover:scale-105 transition-transform relative"
          >
            <Image
              src="https://cineflow-videofiles.s3.ap-south-1.amazonaws.com/posters/1741603384744-squidgametrailerposter.jpg"
              alt="Thumbnail"
              fill
              sizes="(max-width: 160px) 100vw"
              className="object-cover rounded-[8px] shadow-md"
              priority={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
