"use client";
import React, { useRef, useState, CSSProperties, useEffect } from "react";
import Plyr from "plyr-react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import ReactPlayer from "react-player";
import { AppDispatch } from "../redux/store";
import {
  setShowDialog,
  setStoreMovie,
  updateUserWatchHistory,
} from "../redux/slices/movieSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRouter } from "next/navigation";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import ClipLoader from "react-spinners/ClipLoader";

// ReactModal.setAppElement('#__next');
const VideoModal = () => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<string[][]>([]);
  // const playerRef = useRef<any>(null);
  const { selectedMovie, showDialog, clickedCard, showDes } = useSelector(
    (state: any) => state.movie
  );
  // console.log(showDialog, "showDialog");
  // console.log(clickedCard, "clickedCard");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem("myLists");
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems)); // Ensure data is parsed properly
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        setItems([]); // Reset to empty array if JSON is invalid
      }
    }
  }, []);

  const handleModal = (event: any) => {
    // event.stopPropagation()
    dispatch(updateUserWatchHistory(clickedCard?._id));
    // console.log("click");
    dispatch(setShowDialog(!showDialog));
    router.push(`video/${clickedCard?._id}`);
    dispatch(setStoreMovie(clickedCard?.url));
  };
  const closeModal = () => {
    dispatch(setShowDialog(false));
    // if (playerRef.current) {
    //   playerRef.current.seekTo(0); // Optionally reset the video to the beginning
    //   playerRef.current.stop(); // Stop the video
    // }
  };
  const handleWatchList = (clickedCard: any) => {
    const isExist = items?.some((ele: any) => ele?._id == clickedCard?._id);
    if (!isExist) {
      const newArr = [...items, clickedCard];
      const updatedItems = newArr;
      setItems(updatedItems); // Update state
      localStorage.setItem("myLists", JSON.stringify(updatedItems));
    }

    dispatch(setShowDialog(false));
  };
  return (
    <div>
      {/* <div className="close-button" onClick={closeModal}><CloseIcon/></div> */}
      <ReactModal
        isOpen={showDialog}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {/* <button onClick={handleModal} className="close-button">close</button> */}
        {clickedCard && showDialog ? (
          // <div className="video-container">
          //   <ReactPlayer
          //     ref={playerRef}
          //     url={selectedMovie}
          //     playing={true}
          //     controls={true}
          //     className="player"
          //   />
          // </div>
          <div>
            <Card>
              <CardMedia
                sx={{ height: 250 }}
                image={clickedCard?.poster}
                title="movie"
                className="show-image"
              />
              <CardContent className="show-content">
                <div className="show-title">{clickedCard?.title}</div>
                <div className="show-des">
                  {showDes ||
                    clickedCard?.aiDescription ||
                    "Generating Descripation using AI...."}
                </div>
              </CardContent>
              <div className="show-data">
                <div className="show-actions">
                  <PlayCircleOutlineIcon
                    sx={{
                      color: "white",
                      height: "35px",
                      width: "35px",
                      zIndex: 999,
                    }}
                    onClick={handleModal}
                  />
                  <AddCircleOutlineIcon
                    sx={{ color: "white", height: "35px", width: "35px" }}
                    onClick={() => {
                      handleWatchList(clickedCard);
                    }}
                  />
                  <ThumbUpOffAltIcon
                    sx={{ color: "white", height: "35px", width: "35px" }}
                  />
                  <CommentIcon
                    sx={{ color: "white", height: "35px", width: "35px" }}
                  />
                </div>
                <div className="show-info">
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>2025</div>
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>A</div>{" "}
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>
                    {clickedCard?.genre || "Thiller"}
                  </div>{" "}
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>
                    {clickedCard?.type || "Movie"}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <ClipLoader />
        )}
      </ReactModal>
    </div>
  );
};

export default VideoModal;
