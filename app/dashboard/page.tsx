"use client"; //Ensures the component runs in the browsers, important for redux and hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import CardSlider from "../../components/CardSlider";
// import MovieRow from "../../components/MovieRow";
import { RootState, AppDispatch } from "../../redux/store";
import {fetchVideos, getWatchHistory} from "../../redux/slices/movieSlice"

export default function Dashboard() {
  //dispatches an action the redux store
    const dispatch: AppDispatch = useDispatch();
  const {allVideos,userWatchHistory} = useSelector((state:RootState) => state.movie)
  console.log(allVideos,"videos")
  //fetch movies when the component mounts
  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(getWatchHistory())
  }, []);

  const featuredMovie = {
    urlName:"Avatar",
    title: "Avatar: The Way of Water",
    type:"movie",
    genre:"Adventure",
    image: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/poster/Avatar-The+way+of+water.jpg",
    videoUrl :"https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/The+Beauty+Of+Avatar+-+The+Way+Of+Water.mp4",
    description: "The sea is your home, before your birth and after your death.",
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroSection  data={featuredMovie}/>
      <div className="trending-head">Trending Now</div>
      <CardSlider allVideos={allVideos}/>
      <div className="trending-head">continue watching...</div>
      <CardSlider allVideos={userWatchHistory}/>
    </div>
  );
}
