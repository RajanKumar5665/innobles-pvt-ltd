import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // idle | sending | success | error
  error: null,
  lastMessage: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    submitPending: (state) => {
      state.status = "sending";
      state.error = null;
    },
    submitFulfilled: (state, action) => {
      state.status = "success";
      state.lastMessage = action.payload;
    },
    submitRejected: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    resetContact: (state) => {
      state.status = "idle";
      state.error = null;
      state.lastMessage = null;
    },
  },
});

export const { submitPending, submitFulfilled, submitRejected, resetContact } = contactSlice.actions;

// Selectors
export const selectContactStatus = (state) => state.contact.status;
export const selectContactError = (state) => state.contact.error;
export const selectContactMessage = (state) => state.contact.lastMessage;

export default contactSlice.reducer;

