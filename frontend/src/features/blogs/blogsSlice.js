import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle",
  error: null,
};

const blogsSlice = createSlice({
  name: "blogs",
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

export const { fetchPending, fetchFulfilled, fetchRejected } = blogsSlice.actions;

export const selectBlogs = (state) => state.blogs.list;
export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsError = (state) => state.blogs.error;
// The 3 newest published blogs (the backend sorts newest first).
export const selectRecentBlogs = (state) => state.blogs.list.slice(0, 3);

export default blogsSlice.reducer;
