"use client"; //Ensures the component runs in the browsers, important for redux and hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
// import VideoRow from "../../components/VideoRow";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchVideos } from "../../redux/slices/videoSlice";
import VideoRowNew from "../../components/VideoRowNew";

export default function Dashboard() {
  // dispatches an action the redux store
  const dispatch: AppDispatch = useDispatch();
  const {
    videos
    //  status
  } = useSelector((state: RootState) => state.videos);

  //fetch videos when the component mounts
  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroSection />
      {/* <VideoRow title="Trending Now" videos={videos} /> */}
      <VideoRowNew
        title="Trending Now"
        videos={videos}
        fetchMoreVideos={fetchVideos}
      />
    </div>
  );
}
