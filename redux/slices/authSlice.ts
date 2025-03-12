import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Defining interface of the Auth State
interface AuthState {
  user: {
    email: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

//Setting up initial state of the auth state values
const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: false,
  status: "idle",
  error: null
};

interface loginPayload {
  email: string;
  password: string;
}
const API_URL =
  process.env.CINEFLOW_BACKEND_URL || "http://localhost:5000/api/auth";

//Creation of Auth Slice with initial state and reducers
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    payload: loginPayload,
    // credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      localStorage.setItem("token", data.token); // ✅ Store JWT token
      return { user: data.user, token: data.token };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token"); // ✅ Clear token from storage
      state.user = null;
      state.token = null;
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  }
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;
