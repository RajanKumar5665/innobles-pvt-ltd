import { loginApi, logoutApi, fetchAdminMe, fetchDashboardStats } from "./authApi.js";
import {
  beginIntentionalLogout,
  restoreSessionExpiredDetection,
} from "../../lib/api.js";

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
} from "./authSlice.js";

export const login = (credentials) => async (dispatch) => {
  // A login attempt is the boundary of the intentional-logout window: after a
  // normal logout the API layer suppresses the "session expired" flow, and from
  // here on the session is expected to be valid again (so a later genuine
  // expiration is detected normally).
  restoreSessionExpiredDetection();
  dispatch({ type: "auth/loginPending" });
  try {
    // The api layer (api.post) encrypts the whole payload with a random
    // AES-256-GCM key wrapped by the server's RSA public key, so the raw
    // password never leaves the browser in plaintext.
    const data = await loginApi({
      email: credentials.email,
      password: credentials.password,
    });
    dispatch({ type: "auth/loginFulfilled", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "auth/loginRejected", payload: error.message });
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  // Mark the start of an intentional logout so that the 401s produced by the
  // route guards' post-logout fetchMe() calls are never reported as "session
  // expired". The flag stays set after a successful logout and is only cleared
  // by the next login attempt.
  beginIntentionalLogout();
  dispatch({ type: "auth/logoutPending" });
  try {
    await logoutApi();
    dispatch({ type: "auth/logoutFulfilled" });
  } catch (error) {
    // The user is still logged in (cookies untouched), so restore normal
    // expiration detection — a genuine expiry later must still be caught.
    restoreSessionExpiredDetection();
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