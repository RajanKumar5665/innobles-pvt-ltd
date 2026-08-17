import { fetchProductsApi } from "./productsApi";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: "products/fetchPending" });
  try {
    const data = await fetchProductsApi();
    dispatch({ type: "products/fetchFulfilled", payload: data });
  } catch (error) {
    dispatch({ type: "products/fetchRejected", payload: error.message });
  }
};
