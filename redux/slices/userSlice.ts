import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL =
  process.env.CINEFLOW_BACKEND_URL || "http://localhost:5000/api/auth";

//Creation of User Slice with initial state and reducers

interface IUser {
  profile: unknown;
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
      const response = await fetch(`${API_URL}/user/profile`, {
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
