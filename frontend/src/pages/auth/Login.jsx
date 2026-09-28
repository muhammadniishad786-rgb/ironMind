import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Dumbbell,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { loginUser, clearAuthError } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, loginSuccess } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loginSuccess) {
      navigate("/dashboard");
    }
  }, [loginSuccess, navigate]);

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

    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">

      {/* LEFT SIDE - BRAND */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950/30" />

        {/* Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
              <Dumbbell size={24} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight">
                IRON<span className="text-orange-500">MIND</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                Train. Track. Transform.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-lg">

            <p className="text-orange-500 text-sm font-semibold uppercase tracking-[0.25em] mb-5">
              Your fitness journey
            </p>

            <h2 className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight">
              BUILD YOUR
              <br />
              <span className="text-zinc-500">STRONGER</span>
              <br />
              SELF.
            </h2>

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-md">
              Track your workouts, monitor your progress, and stay
              consistent with IronMind.
            </p>

          </div>

          {/* Bottom */}
          <div className="text-sm text-zinc-600">
            © {new Date().getFullYear()} IronMind
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-10 sm:px-8">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">

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
              Welcome back
            </p>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Sign in to IronMind
            </h2>

            <p className="text-zinc-500 mt-3 text-sm">
              Continue your fitness journey.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

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
                  placeholder="Enter your password"
                  required
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
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight
                    size={19}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

          </form>

          {/* Register */}
          <div className="mt-8 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-orange-500 hover:text-orange-400 transition"
            >
              Create account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;