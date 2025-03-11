"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface IVideoProps {
  _id: string;
  title: string;
  type: string;
  genre: string;
  url: string; //s3 video url
  posterUrl: string; //s3 poster url
  createdAt: string;
}

interface IVideoRowProps {
  title: string;
  videos: IVideoProps[];
}

// const BASE_IMAGE_URL = "cineflow-videofiles.s3.ap-south-1.amazonaws.com";

export default function VideoRow({ title, videos }: IVideoRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  //   function to scroll left or right
  const scrollRow = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      rowRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  console.log("posterUrl", videos[0]?.posterUrl);

  return (
    <section className="relative px-10 py-4">
      {/* Video category title */}
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      {/* Left Scroll Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black"
        onClick={() => scrollRow("left")}
      >
        ◀
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 bg-black"
        style={{ right: 0, zIndex: 1 }}
        onClick={() => scrollRow("right")}
      >
        ▶
      </button>
      {/* Video Row Horizontally Scrollable */}
      <div
        ref={rowRef}
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
      >
        {videos?.map((video) => {
          return (
            <motion.div
              key={video._id}
              className="relative w-48 flex flex-shrink-0 group cursor-pointer"
            >
              {/* Video Poster */}
              <Image
                src={video.posterUrl}
                alt={video.title}
                width={260}
                height={288}
                className="rounded priority"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-end p2">
                <p className="text-sm font-semibold text-white">
                  {video.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Right Scroll Button */}
    </section>
  );
}
