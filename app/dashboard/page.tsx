"use client"; //Ensures the component runs in the browsers, important for redux and hooks

import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
// import MovieRow from "../../components/MovieRow";
// import { RootState, AppDispatch } from "../../redux/store";

export default function Dashboard() {
  //dispatches an action the redux store
  //   const dispatch: AppDispatch = useDispatch();
  // const {movies, status} = useSelector((state:RootState) => state.movies)

  //fetch movies when the component mounts
  useEffect(() => {
    // dispatch(fetchMovies());
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  );
}
