import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Dumbbell,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";

import {
  registerUser,
  clearAuthError,
  clearRegisterSuccess,
} from "../../store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, registerSuccess } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (registerSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearRegisterSuccess());
        navigate("/login");
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [registerSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      dispatch(clearAuthError());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950/30" />

        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
              <Dumbbell size={24} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-xl font-black">
                IRON<span className="text-orange-500">MIND</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                Train. Track. Transform.
              </p>
            </div>

          </div>

          {/* Content */}
          <div className="max-w-lg">

            <p className="text-orange-500 text-sm font-semibold uppercase tracking-[0.25em] mb-5">
              Start today
            </p>

            <h2 className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight">
              YOUR
              <br />
              <span className="text-zinc-500">PROGRESS</span>
              <br />
              STARTS NOW.
            </h2>

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-md">
              Build better habits, track every workout, and see how
              you're improving over time.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3">

              {[
                "Track your workouts",
                "Monitor strength progress",
                "Build consistent habits",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-zinc-400"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Check size={14} className="text-orange-500" />
                  </div>

                  {feature}
                </div>
              ))}

            </div>

          </div>

          <div className="text-sm text-zinc-600">
            © {new Date().getFullYear()} IronMind
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-10 sm:px-8">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">

            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
              <Dumbbell size={24} />
            </div>

            <div>
              <h1 className="text-xl font-black">
                IRON<span className="text-orange-500">MIND</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Train. Track. Transform.
              </p>
            </div>

          </div>

          {/* Heading */}
          <div className="mb-8">

            <p className="text-orange-500 text-sm font-semibold mb-3">
              Create your account
            </p>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Join IronMind
            </h2>

            <p className="text-zinc-500 mt-3 text-sm">
              Start tracking your fitness journey today.
            </p>

          </div>

          {/* Success */}
          {registerSuccess && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              <Check size={18} />
              Account created successfully!
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Full name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Muhammad Nishad"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

              <p className="mt-2 text-xs text-zinc-600">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* Register */}
            <button
              type="submit"
              disabled={loading || registerSuccess}
              className="group w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Creating account...
                </>
              ) : registerSuccess ? (
                <>
                  <Check size={19} />
                  Account created
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight
                    size={19}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

          </form>

          {/* Login */}
          <div className="mt-8 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-orange-500 hover:text-orange-400 transition"
            >
              Sign in
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;