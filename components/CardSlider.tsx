"use client";
import React, { useEffect } from "react";
import Slider from "react-slick";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchVideos } from "../redux/slices/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store"; // Import types
import VideoModal from "./videoModal";

function CardSlider({ allVideos }: any) {
  const dispatch = useDispatch<AppDispatch>();
  //   const {movies} = useSelector((state:any)=>state?.movie)
  console.log(allVideos, "movies");
  //  useEffect(()=>{
  //   dispatch(fetchVideos())
  //  },[])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // nextArrow: <div className="slick-next"> ▶</div>,
    // prevArrow: <div className="slick-prev"> ◀</div>,
  };
  return (
    <>
    <VideoModal/>
      <div className="slider-container">
        <Slider {...settings}>
          {allVideos?.map((ele: any, index: number) => (
            <Card
              imageUrl={ele?.poster}
              title={ele?.title}
              videoUrl={ele?.url}
              key={index}
              ele={ele}
            />
          ))}

          {/* <Card
        imageUrl="https://via.placeholder.com/300x200"
        title="Beautiful Landscape"
        description="A beautiful view of the mountains during sunset."
      />
       <Card
        imageUrl="https://via.placeholder.com/300x200"
        title="Beautiful Landscape"
        description="A beautiful view of the mountains during sunset."
      />
       <Card
        imageUrl="https://via.placeholder.com/300x200"
        title="Beautiful Landscape"
        description="A beautiful view of the mountains during sunset."
      />
       <Card
        imageUrl="https://via.placeholder.com/300x200"
        title="Beautiful Landscape"
        description="A beautiful view of the mountains during sunset."
      />
       <Card
        imageUrl="https://via.placeholder.com/300x200"
        title="Beautiful Landscape"
        description="A beautiful view of the mountains during sunset."
      />
       <Card
        imageUrl="https://via.placeholder.com/300x200"
        title="Beautiful Landscape"
        description="A beautiful view of the mountains during sunset."
      /> */}
        </Slider>
      </div>
    </>
  );
}

export default CardSlider;
