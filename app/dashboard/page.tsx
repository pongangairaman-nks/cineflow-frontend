"use client"; //Ensures the component runs in the browsers, important for redux and hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../components/HeroSection";
import CardSlider from "../../components/CardSlider";
// import MovieRow from "../../components/MovieRow";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchVideos,
  getAiRecommendationList,
  getWatchHistory,
} from "../../redux/slices/movieSlice";
import Head from "next/head";

export interface Allvideo {

  aiDescription : string
  genre:string;
 poster:string
  title:string;
  type:string
  url:string
  _id:string;
}

export interface HeroData {
  videoUrl: string;
  urlName: string;
  title: string;
  type: string;
  genre: string;
  image: string;
  description: string;

}

export default function Dashboard() {

  //dispatches an action the redux store
  const dispatch: AppDispatch = useDispatch();
  const { allVideos, userWatchHistory, aiRecommendationList } = useSelector(
    (state: RootState) => state.movie
  );
  // console.log(allVideos, "videos");
  //fetch movies when the component mounts
  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(getWatchHistory());
    dispatch(getAiRecommendationList());
  }, []);

  const featuredMovie :HeroData = {
    urlName: "Avatar",
    title: "Avatar: The Way of Water",
    type: "movie",
    genre: "Adventure",
    image:
      "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/poster/Avatar-The+way+of+water.jpg",
    videoUrl:
      "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/The+Beauty+Of+Avatar+-+The+Way+Of+Water.mp4",
    description:
      "The sea is your home, before your birth and after your death.",
  };

  const allMovies = allVideos?.filter((ele) => {
    return ele?.type == "movie";
  });

  const allTvShows = allVideos?.filter((ele) => {
    return ele?.type == "tv shows";
  });
  console.log(aiRecommendationList, "aiRecommendationList");

  return (
    <>
      <Head>
        <title>My Custom Page Title</title>
      </Head>
      <div className="bg-black text-white min-h-screen">
        {/* <Navbar /> */}
        <HeroSection data={featuredMovie} />
        <div className="trending-head">Trending Now</div>
        <CardSlider allVideos={allVideos} />
        {userWatchHistory?.length > 3 && (
          <>
            <div className="trending-head">continue watching...</div>
            <CardSlider allVideos={userWatchHistory} />
          </>
        )}
        {aiRecommendationList && aiRecommendationList?.length > 0 && (
          <>
            <div className="trending-head">Ai Recommendation List </div>
            <CardSlider allVideos={aiRecommendationList} />
          </>
        )}
        {allMovies && (
          <>
            <div className="trending-head">Binge Worty movies</div>
            <CardSlider allVideos={allMovies} />
          </>
        )}

        {allTvShows && (
          <>
            <div className="trending-head">Critically Acclaimed Tv Shows </div>
            <CardSlider allVideos={allTvShows} />
          </>
        )}
      </div>
    </>
  );
}
