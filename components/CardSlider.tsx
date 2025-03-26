"use client";
import React, { useState } from "react";
// import Slider from "react-slick";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoModal from "./videoModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Video {
  poster: string;
  title: string;
  url: string;
  aiDescription: string;
  _id: string;
}
interface CardSliderProps {
  allVideos: Video[];
  title: string;
}

function CardSlider({ allVideos, title }: CardSliderProps) {
  // const dispatch = useDispatch<AppDispatch>();
  //   const {movies} = useSelector((state:any)=>state?.movie)
  console.log(allVideos, "movies");
  //  useEffect(()=>{
  //   dispatch(fetchVideos())
  //  },[])
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1
  //   // nextArrow: <div className="slick-next"> ▶</div>,
  //   // prevArrow: <div className="slick-prev"> ◀</div>,
  // };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : allVideos.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < allVideos.length - 1 ? prevIndex + 1 : 0
    );
  };
  return (
    <>
      <VideoModal />
      <div className="w-full py-8 ">
        <div className="flex justify-between mb-[16px]">
          <div className="trending-head">{title}</div>
          <div className="flex gap-[8px]">
            <button
              onClick={handlePrev}
              className="z-10 bg-[#1E1E2E] rounded-[4px] hover:bg-black/70 transition-colors"
              style={{ height: "48px" }}
            >
              <ChevronLeft className="text-white" size={16} />
            </button>
            <button
              onClick={handleNext}
              className="z-10 bg-[#1E1E2E] rounded-[4px] hover:bg-black/70 transition-colors"
              style={{ height: "48px" }}
            >
              <ChevronRight className="text-white" size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out space-x-6"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / allVideos.length)
                }%)`,
                width: `${allVideos.length * 100}%`
              }}
            >
              {allVideos?.map((ele: Video, index: number) => (
                <Card
                  imageUrl={ele?.poster}
                  title={ele?.title}
                  videoUrl={ele?.url}
                  key={index}
                  ele={ele}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="slider-container">
        <Slider {...settings}>
          {allVideos?.map((ele: Video, index: number) => (
            <Card
              imageUrl={ele?.poster}
              title={ele?.title}
              videoUrl={ele?.url}
              key={index}
              ele={ele}
            />
          ))}
        </Slider>
      </div> */}
    </>
  );
}

export default CardSlider;
