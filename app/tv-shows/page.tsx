
"use client"
import React,{useEffect} from "react";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import CardSlider from "../../components/CardSlider";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import{fetchTvShows} from "../../redux/slices/movieSlice"

const TvShows = () => {
  const dispatch: AppDispatch = useDispatch();
  const {tvShows} = useSelector((state:RootState)=>state.movie)
  const featuredMovie = {
    urlName:"kung-fu-panda",
    title: "kung fu panda",
    image: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/poster/kung-fu-panda.jpg",
    videoUrl:"https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/KUNG+FU+PANDA+4.mp4",
    description: "There is no secret ingredient. It’s just you.",
  };

     useEffect(() => {
        dispatch(fetchTvShows("tv shows"));
      }, []);


  return (
    <>
      <div className="bg-black text-white min-h-screen">
        {/* <Navbar /> */}
        <HeroSection data={featuredMovie} />
        <div className="trending-head">Trending Now</div>
        <CardSlider allVideos={tvShows} />
      </div>
    </>
  );
};

export default TvShows;
