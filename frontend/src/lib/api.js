const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export { API_BASE };

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

// Sends a JSON request (GET/POST/PUT/PATCH/DELETE).
async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;

  let res;
  try {
    res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Please check your connection.",
    );
  }

  return handleResponse(res);
}

// Sends a file upload (multipart/form-data).
// Content-Type is left to the browser so it sets the right boundary.
async function requestForm(path, options = {}) {
  const url = `${API_BASE}${path}`;

  let res;
  try {
    res = await fetch(url, {
      ...options,
      credentials: "include",
      body: options.body,
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Please check your connection.",
    );
  }

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
  post: (path, body) =>
    request(path, { method: "POST", body: JSON.stringify(body) }),
  postForm: (path, formData) =>
    requestForm(path, { method: "POST", body: formData }),
  put: (path, body) =>
    request(path, { method: "PUT", body: JSON.stringify(body) }),
  putForm: (path, formData) =>
    requestForm(path, { method: "PUT", body: formData }),
  patch: (path, body) =>
    request(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};
