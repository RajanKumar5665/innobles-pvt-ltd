import { fetchBlogsApi } from "./blogsApi";

export const fetchBlogs = () => async (dispatch) => {
  dispatch({ type: "blogs/fetchPending" });
  try {
    const data = await fetchBlogsApi();
    dispatch({ type: "blogs/fetchFulfilled", payload: data });
  } catch (error) {
    dispatch({ type: "blogs/fetchRejected", payload: error.message });
  }
};
