import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiService from "../../services/apiServices";
import AuthShell from "../../components/auth/AuthShell";
import { isAuthenticated } from "./protected";

const inputBase =
  "w-full rounded-[6px] border-1 border-[var(--border-color)] bg-transparent px-3 py-1.5 sm:py-2 text-sm text-fg outline-none transition placeholder:text-[var(--text-secondary)] hover:border-accent/50 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20";
const labelClass =
  "mb-1 sm:mb-1.5 block text-xs font-semibold tracking-[0.03em] text-[var(--text-secondary)]";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) navigate("/", { replace: true });
  }, [navigate]);

  const validateOneByOne = () => {
    if (!form.email) return { field: "email", message: "Email is required" };
    if (!/\S+@\S+\.\S+/.test(form.email))
      return { field: "email", message: "Invalid email format" };
    if (!form.password)
      return { field: "password", message: "Password is required" };
    if (form.password.length < 6)
      return { field: "password", message: "Minimum 6 characters required" };
    return null;
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstError = validateOneByOne();
    if (firstError) {
      setErrors({ [firstError.field]: firstError.message });
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error(
                "Request timed out after 40 seconds. Please try again.",
              ),
            ),
          40000,
        ),
      );
      const response = await Promise.race([
        apiService.post("/auth/login", {
          email: form.email,
          password: form.password,
        }),
        timeout,
      ]);
      const token = response?.token || response?.data?.token;
      const user = response?.user || response?.data?.user;
      if (!token) throw new Error("Token not received");

      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem("session", JSON.stringify({ token, user }));
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
      });
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Login failed";
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (name) =>
    `${inputBase} ${errors[name] ? "border-danger focus-visible:border-danger focus-visible:ring-danger/20" : ""}`;

  return (
    <AuthShell
      eyebrow="SIGN IN"
      title="Welcome back"
      description="Pick up where you left off, your watchlist, layouts and alerts are restored with your session."
      footer={
        <>
          <p className="mt-4 text-center text-[10px] text-[var(--text-secondary)]">
            New here?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-semibold text-(--brand-primary) hover:brightness-110"
            >
              Create an account
            </button>
          </p>
          {/* <p className="mt-6 border-t border-[var(--border-color)] pt-4 text-center text-xs leading-5 text-[var(--text-secondary)]">
            Credentials are used only to authenticate this session. Signing out
            removes the stored session from this device.
          </p> */}
        </>
      }
    >
      <form
        noValidate
        onSubmit={handleSubmit}
        className="space-y-2 sm:space-y-2.5"
      >
        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            className={fieldClass("email")}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-danger">{errors.email}</p>
          )}
        </div>
        <div>
          <div className="mb-1 sm:mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <span className="text-xs text-[var(--text-secondary)]">Minimum 6 characters</span>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              className={`${fieldClass("password")} pr-9`}
              placeholder="••••••••"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute inset-y-0 right-0 grid w-7 place-items-center text-[var(--text-secondary)] hover:text-fg"
            >
              {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-danger">{errors.password}</p>
          )}
        </div>
        <label className="flex cursor-pointer items-center text-xs leading-none text-[var(--text-secondary)]">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="size-3.5 shrink-0 rounded-sm! border-1 bg-surface accent-accent"
          />
          <span className="pl-1">Keep me signed in on this device</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-sm! bg-(--brand-primary) py-1.5 sm:py-2 text-sm font-bold text-white transition hover:brightness-110 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </AuthShell>
  );
}
