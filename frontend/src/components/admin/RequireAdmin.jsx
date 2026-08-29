import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMe,
  selectIsAuthenticated,
  selectAuthStatus,
} from "../../features/auth/authThunks";
import Loader from "../common/Loader";

// Guards admin routes. Shows a spinner while checking the session,
// and redirects to /admin/login if there is no valid session.
const RequireAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const status = useSelector(selectAuthStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMe()).catch(() => navigate("/admin/login"));
    }
  }, [dispatch, navigate, status]);

  // Still loading — check if we have a session.
  if (status === "loading" && !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <Loader size="lg" />
      </div>
    );
  }

  // No session after checking — the redirect is already happening.
  if (!isAuthenticated && status === "error") {
    return null;
  }

  return children;
};

export default RequireAdmin;
