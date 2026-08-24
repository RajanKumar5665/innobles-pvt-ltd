import { fetchServicesApi } from "./servicesApi";
import { fetchPending, fetchFulfilled, fetchRejected } from "./servicesSlice";

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchPending());
  try {
    const data = await fetchServicesApi();
    dispatch(fetchFulfilled(data));
  } catch (error) {
    dispatch(fetchRejected(error.message));
  }
};