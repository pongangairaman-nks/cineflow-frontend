"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

function ScrollableSection(props) {
  const { title, data: recommendedShows } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : recommendedShows.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < recommendedShows.length - 1 ? prevIndex + 1 : 0
    );
  };
  return (
    <div className="w-full px-[24px] py-8 ">
      <div className="flex justify-between mb-[16px]">
        <h2 className="text-white text-2xl mb-6">{title || "Recommended"}</h2>
        <div className="flex gap-[8px]">
          <button
            onClick={handlePrev}
            className="z-10 bg-[#1E1E2E] rounded-[4px] hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="text-white" size={16} />
          </button>
          <button
            onClick={handleNext}
            className="z-10 bg-[#1E1E2E] rounded-[4px] hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="text-white" size={16} />
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out space-x-6"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / recommendedShows.length)
              }%)`,
              width: `${recommendedShows.length * 100}%`
            }}
          >
            {recommendedShows.map((show, index) => (
              <div
                key={index}
                className="mr-[32px] w-[180px] h-[240px] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform relative"
              >
                <Image
                  src="https://cineflow-videofiles.s3.ap-south-1.amazonaws.com/posters/1741603384744-squidgametrailerposter.jpg"
                  alt={show.title}
                  fill
                  sizes="(max-width: 160px) 100vw"
                  className="object-cover rounded-[8px] shadow-md"
                  priority={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollableSection;
