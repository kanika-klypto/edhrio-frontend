import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiService from "../../services/apiServices";
import AuthShell from "../../components/auth/AuthShell";
import { isAuthenticated } from "./protected";

const inputBase =
  "w-full rounded-[6px] border-1 border-[var(--border-color)] bg-transparent px-3 py-1.5 sm:py-2 text-sm text-fg outline-none transition placeholder:text-[var(--text-secondary)] hover:border-accent/50 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20";

function Field({ label, name, error, children, hint }) {
  return (
    <div className="min-w-0">
      <div className="mb-1 sm:mb-1.5 flex items-center justify-between gap-2">
        <label
          htmlFor={name}
          className="text-xs font-semibold tracking-[0.03em] text-[var(--text-secondary)]"
        >
          {label}
        </label>
        {hint && <span className="text-xs text-[var(--text-secondary)]">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) navigate("/", { replace: true });
  }, [navigate]);

  const validateOneByOne = () => {
    if (!form.firstName.trim())
      return { field: "firstName", message: "First name is required" };
    if (!form.lastName.trim())
      return { field: "lastName", message: "Last name is required" };
    if (!form.email) return { field: "email", message: "Email is required" };
    if (!/\S+@\S+\.\S+/.test(form.email))
      return { field: "email", message: "Invalid email format" };
    if (!form.password)
      return { field: "password", message: "Password is required" };
    if (form.password.length < 6)
      return { field: "password", message: "Minimum 6 characters required" };
    if (!form.mobile || form.mobile.replace(/\D/g, "").length < 10)
      return { field: "mobile", message: "Invalid mobile number" };
    if (!form.country.trim())
      return { field: "country", message: "Country is required" };
    return null;
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
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
        apiService.post("/auth/register", { ...form }),
        timeout,
      ]);
      const token = response?.data?.token;
      const user = response?.data?.user;
      if (!token) throw new Error("Token not received from API");

      localStorage.setItem("session", JSON.stringify({ token, user }));
      await Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "Welcome to Edhrio!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
      });
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Signup failed";
      await Swal.fire({
        icon: "error",
        title: "Signup Failed",
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
  const strength = [
    form.password.length >= 8,
    /[a-z]/.test(form.password) && /[A-Z]/.test(form.password),
    /\d/.test(form.password),
    /[^A-Za-z0-9]/.test(form.password),
  ].filter(Boolean).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-danger", "bg-warn", "bg-accent", "bg-success"][
    strength
  ];

  return (
    <AuthShell
      eyebrow="SIGN UP"
      title="Create your account"
      description="Set up your workspace once, then keep your trading setup close at hand."
      formWidth="max-w-[350px]"
      footer={
        <p className="mt-3 text-center text-[10px] text-[var(--text-secondary)]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-(--brand-primary) hover:brightness-110"
          >
            Sign in
          </button>
        </p>
      }
    >
      <form
        noValidate
        onSubmit={handleSubmit}
        className="space-y-2 sm:space-y-2.5"
      >
        <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
          <Field label="First name" name="firstName" error={errors.firstName}>
            <input
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange}
              className={fieldClass("firstName")}
              placeholder="John"
            />
          </Field>
          <Field label="Last name" name="lastName" error={errors.lastName}>
            <input
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              value={form.lastName}
              onChange={handleChange}
              className={fieldClass("lastName")}
              placeholder="Doe"
            />
          </Field>
        </div>
        <Field label="Email address" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={fieldClass("email")}
            placeholder="you@example.com"
          />
        </Field>
        <Field
          label="Password"
          name="password"
          error={errors.password}
          hint="Minimum 6 characters"
        >
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className={`${fieldClass("password")} pr-9`}
              placeholder="••••••••"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute inset-y-0 right-0 grid w-9 place-items-center text-[var(--text-secondary)] hover:text-fg"
            >
              {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
            </button>
          </div>
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((segment) => (
                  <span
                    key={segment}
                    className={`h-1 flex-1 rounded-full ${segment <= strength ? strengthColor : "bg-line"}`}
                  />
                ))}
              </div>
              <p className="mt-1 flex justify-between text-xs text-[var(--text-secondary)]">
                <span>Password strength</span>
                <strong className="font-semibold text-fg">
                  {strengthLabel}
                </strong>
              </p>
            </div>
          )}
        </Field>
        <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
          <Field label="Mobile" name="mobile" error={errors.mobile}>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.mobile}
              onChange={handleChange}
              className={fieldClass("mobile")}
              placeholder="98765 43210"
            />
          </Field>
          <Field label="Country" name="country" error={errors.country}>
            <input
              id="country"
              name="country"
              autoComplete="country-name"
              value={form.country}
              onChange={handleChange}
              className={fieldClass("country")}
              placeholder="India"
            />
          </Field>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-sm! bg-[var(--brand-primary)] py-1.5 sm:py-2 text-sm font-bold text-white transition hover:brightness-110 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </AuthShell>
  );
}
