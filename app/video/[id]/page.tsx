"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import {
  fetchVideoDescription,
  updateWatchHistory
} from "../../../redux/slices/videoSlice";
import { Typography, Paper } from "@mui/material";
// import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import ReactPlayer from "react-player";

export default function VideoPage() {
  const { id: videoId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { videos } = useSelector((state: RootState) => state.videos);
  console.log("videoId", videoId);
  console.log("videos", videos);
  const video = videos.find((video) => video._id === videoId);
  console.log("video", video);
  useEffect(() => {
    if (video && !video.aiDescription) {
      dispatch(fetchVideoDescription(videoId as string));
    }
    dispatch(updateWatchHistory(videoId as string));
  }, [video, videoId, dispatch]);
  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h2 className="text-3xl font-bold">{video?.title}</h2>
      <ReactPlayer
        className="player"
        url={video?.url}
        // width="100%"
        // height="100%"
        controls={true}
        playing={true}
      />
      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6">AI Generated Description</Typography>
        <Typography variant="body2">
          {video?.aiDescription || "Generating description..."}
        </Typography>
      </Paper>
    </div>
  );
}
