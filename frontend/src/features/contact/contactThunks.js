import { submitContactApi } from "./contactApi";

export const submitContact = (payload) => async (dispatch) => {
  dispatch({ type: "contact/submitPending" });
  try {
    const result = await submitContactApi(payload);
    dispatch({ type: "contact/submitFulfilled", payload: result });
  } catch (error) {
    dispatch({ type: "contact/submitRejected", payload: error.message });
  }
};

