import { fetchHomeApi, updateHomeApi } from "./homeApi";

export const fetchHome = () => async (dispatch) => {
  dispatch({ type: "home/fetchPending" });
  try {
    const data = await fetchHomeApi();
    dispatch({ type: "home/fetchFulfilled", payload: data });
  } catch (error) {
    dispatch({ type: "home/fetchRejected", payload: error.message });
  }
};

export const updateHome = (payload) => async (dispatch) => {
  dispatch({ type: "home/updatePending" });
  try {
    const data = await updateHomeApi(payload);
    dispatch({ type: "home/updateFulfilled", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "home/updateRejected", payload: error.message });
    throw error;
  }
};
