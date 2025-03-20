"use client"
import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const VideoPage = () => {
  const { selectedMovie } = useSelector((state: any) => state.movie);
  return (
    <div>
      {" "}
      <ReactPlayer
        // ref={playerRef}
        url={selectedMovie}
        playing={true}
        controls={true}
        className="player"
      />
    </div>
  );
};

export default VideoPage;
