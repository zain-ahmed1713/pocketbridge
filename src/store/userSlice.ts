"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  authorizedWithPocket: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
    },
    authorizedWithPocket(state) {
      state.authorizedWithPocket = true;
    },
  },
});

export const { setUser, authorizedWithPocket } = userSlice.actions;
export default userSlice.reducer;
