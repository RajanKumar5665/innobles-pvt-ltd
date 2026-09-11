import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TriangleAlert, X } from "lucide-react";
import {
  login,
  selectAuthStatus,
  selectAuthError,
} from "../../features/auth/authThunks";
import { clearError } from "../../features/auth/authSlice";
import Loader from "../../components/common/Loader";
import { consumeSessionExpiredFlag } from "../../lib/sessionExpired";
import {
  LIMITS,
  validateEmail,
  validatePassword,
  fieldError,
} from "../../lib/formValidation";

const emptyForm = { email: "", password: "" };
const inputClass =
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyForm);
  const [touched, setTouched] = useState({});

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const isLoading = status === "loading";

  // True when the API layer redirected us here because the admin session expired.
  // The flag is read (and cleared) once from sessionStorage on mount.
  const [sessionExpired, setSessionExpired] = useState(consumeSessionExpiredFlag);

  const errors = {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = (e) =>
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSessionExpired(false);
    setTouched({ email: true, password: true });
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;
    dispatch(clearError());
    try {
      await dispatch(login(formData));
      navigate("/admin");
    } catch(error) {
      // error handled in slice — shown via `error` variable below
      console.error("LOGIN CATCH ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
            Admin
          </p>
          <h1 className="mt-2 font-disp text-3xl font-bold text-white">
            Welcome 
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Sign in to manage your website
          </p>
        </div>

        {sessionExpired && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2.5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200"
          >
            <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p className="flex-1">
              <span className="font-semibold">Your session has expired.</span>{" "}
              Please sign in again to continue.
            </p>
            <button
              type="button"
              onClick={() => setSessionExpired(false)}
              className="mt-0.5 rounded-md p-0.5 text-amber-200 transition-colors hover:bg-amber-400/20"
              aria-label="Dismiss session expired message"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={LIMITS.EMAIL_MAX}
              autoComplete="username"
              className={inputClass}
              placeholder="admin@innobles.in"
              disabled={isLoading}
            />
            {fieldError(errors, touched, "email") && (
              <p className="mt-1.5 text-xs text-red-400">{fieldError(errors, touched, "email")}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={LIMITS.PASSWORD_MAX}
              autoComplete="current-password"
              className={inputClass}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {fieldError(errors, touched, "password") && (
              <p className="mt-1.5 text-xs text-red-400">
                {fieldError(errors, touched, "password")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader size="sm" /> Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          Innobles Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Login;
