import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Target,
  BarChart3,
  ArrowRight,
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
    goal: "",
    experience: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

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

  // =========================
  // HANDLE REGISTER
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(result)) {
      dispatch(clearRegisterSuccess());

      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* =========================
          LEFT SIDE
      ========================= */}

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -top-20 -left-20" />
          <div className="absolute w-96 h-96 bg-orange-600/10 rounded-full blur-3xl bottom-0 right-0" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
              <Dumbbell size={24} className="text-black" />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              Iron<span className="text-orange-500">Mind</span>
            </span>
          </div>

          {/* Hero Text */}
          <div className="max-w-lg">
            <p className="text-orange-500 font-semibold uppercase tracking-[0.2em] text-sm mb-4">
              Start Your Journey
            </p>

            <h1 className="text-5xl xl:text-6xl font-black leading-tight">
              Build your
              <span className="text-orange-500"> stronger </span>
              self.
            </h1>

            <p className="text-zinc-400 text-lg mt-6 leading-relaxed">
              Track your workouts, monitor your progress, and stay consistent
              with IronMind.
            </p>
          </div>

          {/* Bottom */}
          <div className="text-zinc-600 text-sm">
            Train hard. Track everything. Become stronger.
          </div>
        </div>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
              <Dumbbell size={24} className="text-black" />
            </div>

            <span className="text-2xl font-bold">
              Iron<span className="text-orange-500">Mind</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Create your account
            </h2>

            <p className="text-zinc-400 mt-2">
              Start tracking your fitness journey today.
            </p>
          </div>

          {/* =========================
              SUCCESS MESSAGE
          ========================= */}

          {registerSuccess && (
            <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              Account created successfully. Redirecting to login...
            </div>
          )}

          {/* =========================
              ERROR MESSAGE
          ========================= */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* =========================
              FORM
          ========================= */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-500 placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-500 placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-12 outline-none transition focus:border-orange-500 placeholder:text-zinc-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Your Goal
              </label>

              <div className="relative">
                <Target
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />

                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-500 text-zinc-300"
                >
                  <option value="" disabled>
                    Select your goal
                  </option>

                  <option value="muscle_gain">Muscle Gain</option>

                  <option value="weight_loss">Weight Loss</option>

                  <option value="strength">Strength</option>

                  <option value="general_fitness">General Fitness</option>
                </select>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Experience Level
              </label>

              <div className="relative">
                <BarChart3
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />

                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-500 text-zinc-300"
                >
                  <option value="" disabled>
                    Select your experience
                  </option>

                  <option value="beginner">Beginner</option>

                  <option value="intermediate">Intermediate</option>

                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-black font-bold rounded-xl py-3.5 transition flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-zinc-500 text-sm mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-400 font-semibold transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;