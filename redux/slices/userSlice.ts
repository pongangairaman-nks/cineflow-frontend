"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_CINEFLOW_BACKEND_URL || "http://localhost:5000/api";

//Creation of User Slice with initial state and reducers

interface Iprofile {
  name: string;
  email: string;
  profileUrl: string;
}
interface IUser {
  profile: Iprofile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: IUser = {
  profile: null,
  status: "idle",
  error: null
};
export const fetchUserProfile = createAsyncThunk(
  "/user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) throw new Error("Unable to fetch user profile");
      return response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  }
});

export default userSlice.reducer;
