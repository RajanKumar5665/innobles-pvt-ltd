import { encryptPayload } from "./encryptPayload";
import { markSessionExpired } from "./sessionExpired";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export { API_BASE };

// --- Refresh handling (fetch has no interceptors, so we wrap manually) ---
let isRefreshing = false;
let refreshPromise = null;

async function refreshAccessToken() {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = fetch(`${API_BASE}/admin/auth/refresh`, {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      isRefreshing = false;
    });
  }
  return refreshPromise;
}

// Reads the JSON response and throws a normal error on failure.
async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.payload = data;
    throw error;
  }

  return data;
}

// Performs the raw fetch, then transparently retries once on 401
// (after refreshing the access token) — except for the auth endpoints
// themselves, where a 401 is a real "not logged in" / "wrong password".
async function fetchWithRefresh(url, fetchOptions, path) {
  const isAuthEndpoint =
    path.includes("/admin/auth/refresh") || path.includes("/admin/auth/login");

  let res;
  try {
    res = await fetch(url, fetchOptions);
  } catch {
    throw new Error("Unable to reach the server. Please check your connection.");
  }

  if (res.status === 401 && !isAuthEndpoint) {
    try {
      const refreshRes = await refreshAccessToken();
      if (refreshRes.ok) {
        try {
          res = await fetch(url, fetchOptions); // retry original request once
        } catch {
          throw new Error("Unable to reach the server. Please check your connection.");
        }
      } else {
        markSessionExpired();
        window.location.href = "/admin/login";
      }
    } catch {
      markSessionExpired();
      window.location.href = "/admin/login";
    }
  }

  return res;
}

// Sends a JSON request (GET/POST/PUT/PATCH/DELETE).
async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const fetchOptions = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  const res = await fetchWithRefresh(url, fetchOptions, path);
  return handleResponse(res);
}

// JSON requests that carry a body are encrypted (hybrid AES-256-GCM + RSA)
// so the plaintext never leaves the browser. The backend's decryptBody
// middleware restores the original body before route validation.
async function jsonRequest(path, method, body) {
  const encryptedBody = await encryptPayload(body ?? {}, API_BASE);
  return request(path, { method, body: encryptedBody });
}

// Sends a file upload (multipart/form-data).
// Content-Type is left to the browser so it sets the right boundary.
async function requestForm(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const fetchOptions = {
    ...options,
    credentials: "include",
    body: options.body,
  };

  const res = await fetchWithRefresh(url, fetchOptions, path);
  return handleResponse(res);
}

// Builds a query string, skipping empty/undefined values.
function toQueryString(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export const api = {
  get: (path, params) => request(`${path}${toQueryString(params)}`),
  post: (path, body) => jsonRequest(path, "POST", body),
  postForm: (path, formData) =>
    requestForm(path, { method: "POST", body: formData }),
  put: (path, body) => jsonRequest(path, "PUT", body),
  putForm: (path, formData) =>
    requestForm(path, { method: "PUT", body: formData }),
  patch: (path, body) => jsonRequest(path, "PATCH", body),
  delete: (path) => request(path, { method: "DELETE" }),
};