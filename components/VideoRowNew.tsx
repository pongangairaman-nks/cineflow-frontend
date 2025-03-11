"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // ✅ ShadCN UI Modal for video details
import { Video as PlayIcon } from "lucide-react"; // ✅ Play button icon
import { DialogTitle } from "@radix-ui/react-dialog";
import Plyr from "plyr-react";

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
  fetchMoreVideos: () => void; // ✅ Function for Infinite Scrolling
}

export default function VideoRow({
  title,
  videos,
  fetchMoreVideos
}: IVideoRowProps) {
  const rowRef = useRef<HTMLDivElement>(null); // ✅ Reference for scrolling
  const [selectedVideo, setSelectedVideo] = useState<IVideoProps | null>(null); // ✅ State for modal popup

  /**
   * 📌 scrollRow - Moves the video row left or right
   */
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

  /**
   * 📌 handleVideoClick - Opens the Video Details Modal
   */
  const handleVideoClick = (video: IVideoProps) => {
    setSelectedVideo(video);
  };

  return (
    <section className="relative group">
      {/* ✅ Video Category Title */}
      <h3 className="text-xl md:text-2xl font-bold text-white px-10 py-4">
        {title}
      </h3>

      {/* ✅ Left Scroll Button */}
      <MdChevronLeft
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl cursor-pointer z-10 
                   bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full hidden group-hover:block"
        onClick={() => scrollRow("left")}
      />

      {/* ✅ Video Row - Horizontally Scrollable */}
      <div
        ref={rowRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4 px-10"
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (
            target.scrollLeft + target.clientWidth >=
            target.scrollWidth - 10
          ) {
            fetchMoreVideos(); // ✅ Load more videos when scrolled to the end
          }
        }}
      >
        {videos?.map((video) => (
          <motion.div
            key={video._id}
            className="relative flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10"
            onClick={() => handleVideoClick(video)}
          >
            {/* ✅ Video Poster */}
            <div className="relative w-48 md:w-56 lg:w-64 rounded-md overflow-hidden">
              <Image
                src={video.posterUrl}
                alt={video.title}
                width={250}
                height={375}
                className="rounded-md object-cover w-full h-full"
                priority
              />
              {/* ✅ Play Button on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-all">
                <PlayIcon size={50} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ✅ Right Scroll Button */}
      <MdChevronRight
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-4xl cursor-pointer z-10
                   bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full hidden group-hover:block"
        onClick={() => scrollRow("right")}
      />

      {/* ✅ Video Details Modal */}
      {selectedVideo && (
        <Dialog
          open={Boolean(selectedVideo)}
          onOpenChange={() => setSelectedVideo(null)}
        >
          <DialogTitle>{selectedVideo.title}</DialogTitle>
          <DialogContent className="max-w-2xl bg-black text-white">
            {/* ✅ Video Poster */}
            <Image
              src={selectedVideo.posterUrl}
              alt={selectedVideo.title}
              width={300}
              height={450}
              className="rounded-md"
            />
            {/* ✅ Video Details */}
            <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
            {/* <p className="text-gray-400">{selectedVideo.description || "No description available."}</p> */}

            {/* ✅ Play Video Preview if available */}
            {selectedVideo.url && (
              <Plyr
                source={{
                  type: "video",
                  sources: [
                    {
                      src: selectedVideo.url,
                      provider: "html5"
                    }
                  ]
                }}
                options={{
                  controls: [
                    "play",
                    "progress",
                    "current-time",
                    "mute",
                    "fullscreen"
                  ],
                  autoplay: true
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
