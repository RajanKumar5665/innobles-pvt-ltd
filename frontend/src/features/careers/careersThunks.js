import { fetchCareersApi } from "./careersApi";

export const fetchCareers = () => async (dispatch) => {
  dispatch({ type: "careers/fetchPending" });
  try {
    const data = await fetchCareersApi();
    dispatch({ type: "careers/fetchFulfilled", payload: data });
  } catch (error) {
    dispatch({ type: "careers/fetchRejected", payload: error.message });
  }
};
