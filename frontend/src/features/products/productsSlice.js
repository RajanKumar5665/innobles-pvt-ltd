import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
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

export const { fetchPending, fetchFulfilled, fetchRejected } = productsSlice.actions;

export const selectProducts = (state) => state.products.list;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
