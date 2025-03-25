import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import{setShowDialog, setClickedcard, fetchVideoDescription} from "../redux/slices/movieSlice"

interface CardProps {
  imageUrl: any;
  title: any;
  videoUrl: any;
  ele:any
}

const Card: React.FC<CardProps> = ({ imageUrl, title, videoUrl,ele }) => {
  const dispatch = useDispatch()
  // const [showDialog, setShowDIalog] = useState<boolean>(false);

  const hanldeVideo = async (video: string, image: string,ele:any) => {
    let res
    if(!ele?.aiDescription){
     res = await dispatch(fetchVideoDescription(ele?._id))
    }
    if(res){
      dispatch(setShowDialog(true))
      dispatch(setClickedcard(ele))
    }
 
  };

  return (
    <>
      <div className="card" onClick={() => hanldeVideo(videoUrl, imageUrl,ele)}>
        <div className="card-image-container">
          <Image
            src={imageUrl}
            alt={title}
            //   layout="fill"
            width={300}
            height={300}
            objectFit="cover"
            unoptimized
          />
          <h3 className="card-title">{title}</h3>
        </div>
        {/* <div className="card-content">
        <p className="card-description">{description}</p>
      </div> */}
      </div>

   
    </>
  );
};

export default Card;
