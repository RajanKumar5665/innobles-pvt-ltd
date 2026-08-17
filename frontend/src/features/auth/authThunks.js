import { loginApi, logoutApi, fetchAdminMe, fetchDashboardStats } from "./authApi";

// Re-export selectors so consumers can import thunks AND selectors
// from a single module: authThunks.js
export {
  selectIsAuthenticated,
  selectAdmin,
  selectAuthStatus,
  selectAuthError,
  selectStats,
  selectStatsStatus,
  selectStatsError,
} from "./authSlice";

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: "auth/loginPending" });
  try {
    const data = await loginApi(credentials);
    dispatch({ type: "auth/loginFulfilled", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "auth/loginRejected", payload: error.message });
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "auth/logoutPending" });
  try {
    await logoutApi();
    dispatch({ type: "auth/logoutFulfilled" });
  } catch (error) {
    dispatch({ type: "auth/logoutRejected", payload: error.message });
    throw error;
  }
};

export const fetchMe = () => async (dispatch) => {
  dispatch({ type: "auth/fetchMePending" });
  try {
    const data = await fetchAdminMe();
    dispatch({ type: "auth/fetchMeFulfilled", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "auth/fetchMeRejected", payload: error.message });
    throw error;
  }
};

export const fetchStats = () => async (dispatch) => {
  dispatch({ type: "auth/fetchStatsPending" });
  try {
    const data = await fetchDashboardStats();
    dispatch({ type: "auth/fetchStatsFulfilled", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "auth/fetchStatsRejected", payload: error.message });
    throw error;
  }
};
