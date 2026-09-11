// -----------------------------------------------------------------------------
// Session-expiry flag (admin panel)
// -----------------------------------------------------------------------------
// When the admin session expires, the API layer cannot redirect through
// react-router (it has no access to it), so it drops a flag in sessionStorage
// right before the full-page redirect to /admin/login. The login page reads and
// clears the flag, then shows a "Your session has expired, sign in again"
// message.
//
// sessionStorage (not localStorage) is deliberate: the flag only lives as long
// as the current tab stays open, so a stale "expired" notice can never linger
// into a future browser session.
// -----------------------------------------------------------------------------

export const SESSION_EXPIRED_KEY = "innoblesAdminSessionExpired";

export function markSessionExpired() {
  try {
    sessionStorage.setItem(SESSION_EXPIRED_KEY, "1");
  } catch {
    // Storage unavailable (private mode / blocked) — the notice is simply not shown.
  }
}

// Reads the flag once and clears it, so the notice is shown a single time.
export function consumeSessionExpiredFlag() {
  try {
    const expired = sessionStorage.getItem(SESSION_EXPIRED_KEY) === "1";
    sessionStorage.removeItem(SESSION_EXPIRED_KEY);
    return expired;
  } catch {
    return false;
  }
}