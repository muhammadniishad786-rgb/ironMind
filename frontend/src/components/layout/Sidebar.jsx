import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  LayoutDashboard,
  Dumbbell,
  ChartNoAxesCombined,
  User,
  LogOut,
  X,
} from "lucide-react";

import { logout } from "../../store/slices/authSlice";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Workouts",
      path: "/workouts",
      icon: Dumbbell,
    },
    {
        name: "Exercises",
        path: "/exercises",
        icon: Dumbbell
    },
    {
      name: "Progress",
      path: "/progress",
      icon: ChartNoAxesCombined,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    dispatch(logout());

    // Close mobile sidebar
    setIsOpen(false);

    // Go to login page
    navigate("/login");
  };

  return (
    <>
      {/* =========================
          MOBILE OVERLAY
      ========================== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================== */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          border-r border-zinc-800 bg-zinc-950
          transition-transform duration-300 ease-in-out
          lg:z-40 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =========================
            LOGO
        ========================== */}
        <div className="flex h-20 items-center justify-between border-b border-zinc-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-black">
              <Dumbbell size={21} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                IRON<span className="text-orange-500">MIND</span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Train. Track. Transform.
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* =========================
            NAVIGATION
        ========================== */}
        <nav className="px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
            Menu
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-orange-500 text-black"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* =========================
            LOGOUT
        ========================== */}
        <div className="absolute bottom-0 left-0 w-full border-t border-zinc-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-red-400"
          >
            <LogOut size={19} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;