import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.access_token;
      state.user = action.payload.user;
    },
  },
});

export const { setAuth } = userSlice.actions;

export default userSlice.reducer;
