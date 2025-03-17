import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import Error from "next/error";
//defining typescript interface for video data
interface IVideo {
  _id: string;
  title: string;
  type: string;
  genre: string;
  url: string; //s3 video url
  posterUrl: string; //s3 poster url
  createdAt: string;
}

//define state interface for redux
interface IVideoState {
  videos: IVideo[]; // array of video objects
  videoLikesLatest: Array<{ likes: number; videoId: string }>;
  status: "idle" | "loading" | "succeeded" | "failed"; // fetching status
  error: string | undefined; // error message
}

//initial state for redux store

const initialState: IVideoState = {
  videos: [],
  videoLikesLatest: [],
  status: "idle",
  error: ""
};

//fetch videos - async function to fetch all videos from the backend
//uses createAsyncThunk to handle async operations
//createAsyncThunk - automatically tracks loading, success, error states

const API_URL = process.env.API_URL || "http://localhost:5000/api";

//fetch videos
export const fetchVideos = createAsyncThunk<
  IVideo[],
  void,
  { rejectValue: string }
>("video/fetchAllVideos", async (_, { rejectWithValue }) => {
  try {
    //making get request to fetch videos from backend
    const response = await fetch(`${API_URL}/video/getAllVideos`);
    //if response is not ok, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }
    //parse the json response
    const data = await response.json();
    //return the array of video objects from the api response
    return data.videos;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    //handles and returns errors if any
    return rejectWithValue(error?.message);
  }
});

//like a video
export const likeVideo = createAsyncThunk(
  "video/like",
  async (videoId: string, { rejectWithValue }) => {
    try {
      //making get request to fetch videos from backend
      const response = await fetch(`${API_URL}/video/${videoId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      //if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      //parse the json response
      const data = await response.json();
      //return the array of video objects from the api response
      return { videoId, data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //handles and returns errors if any
      return rejectWithValue(error?.message);
    }
  }
);

//like a video
export const commentVideo = createAsyncThunk(
  "video/comment",
  async (
    { videoId, text }: { videoId: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      //making get request to fetch videos from backend
      const response = await fetch(`${API_URL}/video/${videoId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ text })
      });
      //if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      //parse the json response
      const data = await response.json();
      //return the array of video objects from the api response
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //handles and returns errors if any
      return rejectWithValue(error?.message);
    }
  }
);

//video slice for redux slice for handling videos state in redux
const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {}, // no manual reducers needed since async actions are handled by createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        //set loading state while fetching
        state.status = "loading";
      })
      .addCase(
        fetchVideos.fulfilled,
        (state, action: PayloadAction<IVideo[]>) => {
          //update  status when data successfully fetched
          state.status = "succeeded";
          //store fetched videos in redux state
          state.videos = action.payload;
        }
      )
      .addCase(
        fetchVideos.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          //handle error if request fails
          state.status = "failed";
          //store error message if request fails
          state.error = action.payload;
        }
      )
      .addCase(likeVideo.pending, (state) => {
        //set loading state while fetching
        state.status = "loading";
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        //update  status when data successfully fetched
        state.status = "succeeded";
        console.log("action", action.payload);
        //store fetched videos in redux state
        state.videoLikesLatest = [
          ...state.videoLikesLatest,
          { likes: action.payload.data.likes, videoId: action.payload.videoId }
        ];
      });
    // .addCase(
    //   likeVideo.rejected,
    //   (state, action: PayloadAction<string | undefined>) => {
    //     //handle error if request fails
    //     state.status = "failed";
    //     //store error message if request fails
    //     state.error = action.payload;
    //   }
    // );
  }
});

export default videoSlice.reducer;
