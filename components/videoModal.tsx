"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { AppDispatch } from "../redux/store";
import {
  addCommentToVideo,
  addLikeToVideo,
  getCommentVideo,
  setShowDialog,
  setStoreMovie,
  updateUserWatchHistory
} from "../redux/slices/movieSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { Avatar, TextField, Tooltip } from "@mui/material";
import { RootState } from "../redux/store";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
// ReactModal.setAppElement('#__next');

interface ClickCard {
  _id: string;
}

const VideoModal = () => {
  // const comments = 3;
  // const override: CSSProperties = {
  //   display: "block",
  //   margin: "0 auto",
  //   borderColor: "red",
  // };
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<ClickCard[]>([]);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>("");
  // const playerRef = useRef<any>(null);
  const { showDialog, clickedCard, showDes, videoComments, likeResponse } =
    useSelector((state: RootState) => state.movie);

  console.log(inputComment, "inputComment");
  console.log(clickedCard, "clickedCard");
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

  const handleModal = () => {
    // event.stopPropagation()
    dispatch(updateUserWatchHistory(clickedCard?._id));
    // console.log("click");
    dispatch(setShowDialog(!showDialog));
    router.push(`/video/${clickedCard?._id}`);
    dispatch(setStoreMovie(clickedCard?.url));
  };
  const closeModal = () => {
    dispatch(setShowDialog(false));
    // if (playerRef.current) {
    //   playerRef.current.seekTo(0); // Optionally reset the video to the beginning
    //   playerRef.current.stop(); // Stop the video
    // }
  };
  const handleWatchList = (clickedCard: ClickCard) => {
    const isExist = items?.some((ele) => ele?._id == clickedCard?._id);
    if (!isExist) {
      const newArr = [...items, clickedCard];
      const updatedItems = newArr;
      setItems(updatedItems); // Update state
      localStorage.setItem("myLists", JSON.stringify(updatedItems));
    }

    dispatch(setShowDialog(false));
  };

  const handleComment = async () => {
    const commentData = {
      videoId: clickedCard?._id,
      text: inputComment
    };
    const res = await dispatch(addCommentToVideo(commentData));
    if (res?.payload?.status == 200) {
      dispatch(getCommentVideo(clickedCard?._id));
    }
    console.log(res, "res");
    setInputComment("");
  };
  const handleLike = () => {
    dispatch(addLikeToVideo(clickedCard?._id));
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
        {showDialog ? (
          <div>
            <Card>
              <CardMedia
                sx={{ height: 250 }}
                image={clickedCard?.poster}
                title="movie"
                className="show-image"
              />
              <CardContent className="show-content">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    className="show-title"
                    style={{ fontSize: "24px", fontStyle: "italic" }}
                  >
                    {clickedCard?.title}
                  </div>
                  <div className="show-info">
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: "small",
                        color: "grey",
                        width: "0.7rem",
                        height: "0.7rem"
                      }}
                    />
                    <div style={{ color: "white", marginLeft: "-3px" }}>
                      2025
                    </div>
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: "small",
                        color: "grey",
                        width: "0.7rem",
                        height: "0.7rem"
                      }}
                    />
                    <div style={{ color: "white", marginLeft: "-3px" }}>A</div>{" "}
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: "small",
                        color: "grey",
                        width: "0.7rem",
                        height: "0.7rem"
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
                        height: "0.7rem"
                      }}
                    />
                    <div style={{ color: "white", marginLeft: "-3px" }}>
                      {clickedCard?.type || "Movie"}
                    </div>
                  </div>
                </div>
                <div className="show-des">
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      marginTop: "8px"
                    }}
                  >
                    AI Description
                  </div>
                  {showDes ||
                    clickedCard?.aiDescription ||
                    "Generating Descripation using AI...."}
                </div>
              </CardContent>
              <div className="show-data">
                <div className="show-actions">
                  <Tooltip title="Play Video" style={{ margin: "4px" }}>
                    <PlayArrowRoundedIcon
                      sx={{
                        color: "white",
                        height: "40px",
                        width: "40px",
                        zIndex: 999
                      }}
                      onClick={handleModal}
                    />
                  </Tooltip>
                  <Tooltip title="Add to Watchlist" style={{ margin: "4px" }}>
                    <BookmarkAddOutlinedIcon
                      sx={{ color: "white", height: "35px", width: "35px" }}
                      onClick={() => {
                        handleWatchList(clickedCard);
                      }}
                    />
                  </Tooltip>
                  {likeResponse?.likes == 0 ? (
                    <Tooltip title="Like" style={{ margin: "4px" }}>
                      <FavoriteBorderIcon
                        sx={{ color: "white", height: "35px", width: "35px" }}
                        onClick={handleLike}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Dislike" style={{ margin: "4px" }}>
                      <FavoriteIcon
                        sx={{ color: "red", height: "35px", width: "35px" }}
                        onClick={handleLike}
                      />
                    </Tooltip>
                  )}
                  <Tooltip
                    title="Add Comment"
                    sx={{ color: "white", margin: "4px" }}
                  >
                    <MessageOutlinedIcon
                      sx={{ color: "white", height: "32px", width: "35px" }}
                      onClick={() => {
                        dispatch(getCommentVideo(clickedCard?._id));
                        setShowCommentBox(true);
                      }}
                    />
                  </Tooltip>
                </div>
                {/* <div className="show-info">
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem"
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>2025</div>
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem"
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>A</div>{" "}
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem"
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
                      height: "0.7rem"
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>
                    {clickedCard?.type || "Movie"}
                  </div>
                </div> */}
              </div>
              {showCommentBox ? (
                <div className="comment-section">
                  <div
                    className="comment-title"
                    style={{ paddingLeft: "24px", paddingTop: "16px" }}
                  >{`Total Comments: ${videoComments?.result?.length}`}</div>
                  <div className="comment-merge">
                    <TextField
                      fullWidth
                      placeholder="Add Comment.."
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#6e44ff"
                            // color:"white"
                          }
                        }
                      }}
                      className="textfield"
                      value={inputComment}
                      onChange={(event) => {
                        setInputComment(event?.target.value);
                      }}
                    />
                    <div
                      className="submit-parent"
                      style={{ paddingRight: "24px" }}
                    >
                      <button className="moreInfoBtn" onClick={handleComment}>
                        {" "}
                        Submit
                      </button>
                    </div>
                  </div>
                  {videoComments &&
                    videoComments.result &&
                    videoComments.result.length > 0 && (
                      <div className="comment-parent">
                        {videoComments?.result &&
                          videoComments?.result?.map((ele, index: number) => (
                            <div className="comment-profile" key={index}>
                              <Avatar
                                alt={ele?.user.name}
                                src={ele?.user?.avatar}
                                sx={{ width: 40, height: 40 }}
                              />
                              <div>
                                <Typography
                                  sx={{
                                    color: "white",
                                    fontSize: "16px",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {ele?.user.name}
                                </Typography>
                                <Typography sx={{ color: "white" }}>
                                  {ele?.comment}
                                </Typography>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                </div>
              ) : (
                <></>
              )}
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
