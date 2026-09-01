import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  stats: {},
  status: "idle",
  statsStatus: "idle",
  error: null,
  statsError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("auth/loginPending", (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase("auth/loginFulfilled", (state, action) => {
        state.status = "success";
        state.admin = action.payload;
        state.error = null;
      })
      .addCase("auth/loginRejected", (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase("auth/logoutPending", (state) => {
        state.status = "loading";
      })
      .addCase("auth/logoutFulfilled", (state) => {
        state.status = "idle";
        state.admin = null;
        state.stats = {};
        state.statsStatus = "idle";
        state.error = null;
        state.statsError = null;
      })
      .addCase("auth/logoutRejected", (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase("auth/fetchMePending", (state) => {
        state.status = "loading";
      })
      .addCase("auth/fetchMeFulfilled", (state, action) => {
        state.status = "success";
        state.admin = action.payload;
      })
      .addCase("auth/fetchMeRejected", (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase("auth/fetchStatsPending", (state) => {
        state.statsStatus = "loading";
        state.statsError = null;
      })
      .addCase("auth/fetchStatsFulfilled", (state, action) => {
        state.statsStatus = "success";
        state.stats = action.payload;
      })
      .addCase("auth/fetchStatsRejected", (state, action) => {
        state.statsStatus = "error";
        state.statsError = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;

// Selectors
export const selectAdmin = (state) => state.auth.admin;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectStats = (state) => state.auth.stats;
export const selectStatsStatus = (state) => state.auth.statsStatus;
export const selectStatsError = (state) => state.auth.statsError;
export const selectIsAuthenticated = (state) => !!state.auth.admin;

export default authSlice.reducer;
