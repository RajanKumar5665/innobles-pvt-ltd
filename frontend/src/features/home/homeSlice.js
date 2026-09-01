import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  status: "idle",
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("home/fetchPending", (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase("home/fetchFulfilled", (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase("home/fetchRejected", (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const selectHome = (state) => state.home.data;
export const selectHomeStatus = (state) => state.home.status;

export default homeSlice.reducer;
