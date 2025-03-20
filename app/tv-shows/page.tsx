
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
    title: "Shogun",
    image: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/poster/shogun.jpg",
    description: "A nation of violence, Samurai warriors ... and forbidden love.",
  };

     useEffect(() => {
        dispatch(fetchTvShows("tv shows"));
      }, []);


  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <HeroSection data={featuredMovie} />
        <div className="trending-head">Trending Now</div>
        <CardSlider allVideos={tvShows} />
      </div>
    </>
  );
};

export default TvShows;
