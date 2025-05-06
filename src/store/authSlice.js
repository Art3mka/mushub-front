import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    username: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.userId = null;
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
