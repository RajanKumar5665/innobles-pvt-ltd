import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle",
  error: null,
};

const careersSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchFulfilled: (state, action) => {
      state.status = "success";
      state.list = action.payload;
    },
    fetchRejected: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchFulfilled, fetchRejected } = careersSlice.actions;

export const selectCareers = (state) => state.careers.list;
export const selectCareersStatus = (state) => state.careers.status;
export const selectCareersError = (state) => state.careers.error;

export default careersSlice.reducer;
