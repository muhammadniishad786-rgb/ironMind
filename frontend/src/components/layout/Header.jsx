import { Bell, Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ setIsSidebarOpen }) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/profile")
  }
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">

      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Mobile Menu */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Desktop Welcome */}
        <div className="hidden lg:block">
          <p className="text-sm font-medium text-zinc-500">
            Welcome back
          </p>
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2">

          {/* Notification */}
          <button className="relative rounded-xl p-2.5 text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-zinc-900"
           onClick={() => handleNavigate()}
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800">
              <User size={18} className="text-zinc-400" />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-white">
                User
              </p>

              <p className="text-[10px] text-zinc-600">
                Member
              </p>
            </div>

          </button>

        </div>

      </div>

    </header>
  );
};

export default Header;