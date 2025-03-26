"use client"; //Ensures the component runs in the browsers, important for redux and hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSlider from "../../../components/CardSlider";
// import MovieRow from "../../components/MovieRow";
import { RootState, AppDispatch } from "../../../redux/store";
import { getWatchHistory } from "../../../redux/slices/movieSlice";
import Head from "next/head";

export interface Allvideo {
  aiDescription: string;
  genre: string;
  poster: string;
  title: string;
  type: string;
  url: string;
  _id: string;
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
  const { userWatchHistory } = useSelector((state: RootState) => state.movie);
  // console.log(allVideos, "videos");
  //fetch movies when the component mounts
  useEffect(() => {
    dispatch(getWatchHistory());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>My Custom Page Title</title>
      </Head>
      <div className="bg-black text-white min-h-screen">
        {userWatchHistory?.length > 3 && (
          <>
            <div className="trending-head">continue watching...</div>
            <CardSlider allVideos={userWatchHistory} />
          </>
        )}
      </div>
    </>
  );
}
