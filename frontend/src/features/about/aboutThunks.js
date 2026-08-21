import { fetchAboutApi } from "./aboutApi";

export const fetchAbout = () => async (dispatch) => {
  dispatch({ type: "about/fetchPending" });
  try {
    const data = await fetchAboutApi();
    dispatch({ type: "about/fetchFulfilled", payload: data });
  } catch (error) {
    dispatch({ type: "about/fetchRejected", payload: error.message });
  }
};