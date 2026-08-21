import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  status: "idle", // idle | loading | success | error
  error: null,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchFulfilled: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    fetchRejected: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchFulfilled, fetchRejected } = aboutSlice.actions;

export const selectAbout = (state) => state.about.data;
export const selectAboutStatus = (state) => state.about.status;
export const selectAboutError = (state) => state.about.error;

export default aboutSlice.reducer;