import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  selectAuthStatus,
  selectAuthError,
} from "../../features/auth/authThunks";
import { clearError } from "../../features/auth/authSlice";
import Loader from "../../components/common/Loader";

const emptyForm = { email: "", password: "" };
const inputClass =
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyForm);
  const [touched, setTouched] = useState({});

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const isLoading = status === "loading";

  const errors = {};
  if (!formData.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errors.email = "Enter a valid email";
  if (!formData.password) errors.password = "Password is required";

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = (e) =>
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (Object.keys(errors).length) return;
    dispatch(clearError());
    try {
      await dispatch(login(formData));
      navigate("/admin");
    } catch {
      // error handled in slice — shown via `error` variable below
    }
  };

  const fieldError = (name) =>
    touched[name] && errors[name] ? errors[name] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
            Admin
          </p>
          <h1 className="mt-2 font-disp text-3xl font-bold text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Sign in to manage your website
          </p>
        </div>

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
              className={inputClass}
              placeholder="admin@innobles.in"
              disabled={isLoading}
            />
            {fieldError("email") && (
              <p className="mt-1.5 text-xs text-red-400">{fieldError("email")}</p>
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
              className={inputClass}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {fieldError("password") && (
              <p className="mt-1.5 text-xs text-red-400">
                {fieldError("password")}
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
