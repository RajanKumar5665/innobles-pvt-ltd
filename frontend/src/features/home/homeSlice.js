import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  status: "idle",
  updateStatus: "idle",
  error: null,
  updateError: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUpdateError: (state) => {
      state.updateError = null;
    },
  },
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
      })
      .addCase("home/updatePending", (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase("home/updateFulfilled", (state, action) => {
        state.updateStatus = "success";
        state.data = action.payload;
      })
      .addCase("home/updateRejected", (state, action) => {
        state.updateStatus = "error";
        state.updateError = action.payload;
      });
  },
});

export const { clearError, clearUpdateError } = homeSlice.actions;

export const selectHome = (state) => state.home.data;
export const selectHomeStatus = (state) => state.home.status;
export const selectHomeError = (state) => state.home.error;
export const selectHomeUpdateStatus = (state) => state.home.updateStatus;
export const selectHomeUpdateError = (state) => state.home.updateError;

export default homeSlice.reducer;
