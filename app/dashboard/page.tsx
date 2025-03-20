"use client"; //Ensures the component runs in the browsers, important for redux and hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import CardSlider from "../../components/CardSlider";
// import MovieRow from "../../components/MovieRow";
import { RootState, AppDispatch } from "../../redux/store";
import {fetchVideos} from "../../redux/slices/movieSlice"

export default function Dashboard() {
  //dispatches an action the redux store
    const dispatch: AppDispatch = useDispatch();
  const {allVideos} = useSelector((state:RootState) => state.movie)
  console.log(allVideos,"videos")
  //fetch movies when the component mounts
  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  const featuredMovie = {
    title: "Furiosa: Mad Max Saga",
    image: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/poster/sgw.png",
    description: "The prequel to the 2015 film Mad Max: Fury Road",
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroSection  data={featuredMovie}/>
      <div className="trending-head">Trending Now</div>
      <CardSlider allVideos={allVideos}/>
    </div>
  );
}
