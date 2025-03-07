import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Defining interface of the Auth State
interface AuthState {
  user: {
    email: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

//Setting up initial state of the auth state values
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false
};

//Creation of Auth Slice with initial state and reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login  reducer that takes the previous state and updates the state in the reducer
    login: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.user = {
        email: action.payload.email
      };
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
