import { fetchServicesApi } from "./servicesApi";

export const fetchServices = () => async (dispatch) => {
  dispatch({ type: "services/fetchPending" });
  try {
    const data = await fetchServicesApi();
    dispatch({ type: "services/fetchFulfilled", payload: data });
  } catch (error) {
    dispatch({ type: "services/fetchRejected", payload: error.message });
  }
};

