import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle", // idle | loading | success | error
  error: null,
};

const servicesSlice = createSlice({
  name: "services",
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

export const { fetchPending, fetchFulfilled, fetchRejected } = servicesSlice.actions;

// Selectors
export const selectServices = (state) => state.services.list;
export const selectServicesStatus = (state) => state.services.status;
export const selectServicesError = (state) => state.services.error;

export default servicesSlice.reducer;

