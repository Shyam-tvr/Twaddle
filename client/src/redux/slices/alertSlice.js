import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postUpload: false,
  mainLoader: false
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setPostUpload: (state, action) => {
      state.postUpload = action.payload;
    },
    setMainLoader: (state, action) => {
      state.mainLoader = action.payload;
    },
  },
});

export const { setPostUpload, setMainLoader } = alertSlice.actions;

export default alertSlice.reducer;
