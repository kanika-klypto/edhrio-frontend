import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiLogOut, FiHome } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import Swal from "sweetalert2";
import { isAuthenticated, logout, getUser } from "../../pages/auth/protected";

export function ChartHeaderProfileMenu({ theme: propTheme, onToggleTheme }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [internalTheme, setInternalTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const loggedIn = isAuthenticated();

  const isChartPage =
    location.pathname === "/chart" || location.pathname.startsWith("/chart");
  const theme = propTheme || internalTheme;
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const closeProfileMenu = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsProfileMenuOpen(false);
    };

    document.addEventListener("mousedown", closeProfileMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeProfileMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const toggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      setInternalTheme((previousTheme) =>
        previousTheme === "dark" ? "light" : "dark"
      );
    }
  };

  const handleLogout = async () => {
    setIsProfileMenuOpen(false);
    const result = await Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef5350",
      background: "var(--bg-secondary)",
      color: "var(--text-primary)",
    });

    if (result.isConfirmed) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div ref={profileMenuRef} className="relative flex shrink-0 items-center">
      <button
        type="button"
        className={
          loggedIn
            ? "flex cursor-pointer items-center justify-center rounded-full! border-none bg-transparent p-0"
            : "grid size-10 cursor-pointer place-items-center rounded-full! border-1 border-border bg-transparent text-ink transition hover:border-accent hover:text-accent"
        }
        title="Open profile menu"
        aria-label="Open profile menu"
        aria-haspopup="menu"
        aria-expanded={isProfileMenuOpen}
        onClick={() => setIsProfileMenuOpen((open) => !open)}
      >
        {loggedIn ? (
          <div
            className="flex h-7 w-7 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full bg-(--brand-primary) text-[12px] font-bold  text-white "
          >
            {user?.firstName
              ? user.firstName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()
              : user?.email
              ? user.email.charAt(0).toUpperCase()
              : "U"}
          </div>
        ) : (
          <LuUser className="size-4" aria-hidden="true" />
        )}
      </button>

      {isProfileMenuOpen && (
        <div
          className="absolute top-[calc(100%+8px)] right-0 z-[1100] w-[210px] overflow-hidden rounded-xl border-1 border-border bg-(--bg-secondary) text-white shadow-[0_12px_32px_rgba(0,0,0,0.24)]"
          role="menu"
        >
          {loggedIn ? (
            <>
              <div className="px-[14px] py-[12px]">
                <div className="truncate text-[12px] font-semibold text-fg">
                  {(user?.firstName || "") +
                    (user?.lastName ? " " + user.lastName : "") ||
                    user?.email ||
                    "User"}
                </div>
                <div className="mt-[3px] truncate text-[0.75rem] text-fg-muted">
                  {user?.email || ""}
                </div>
              </div>
              <div
                className={`mx-auto flex h-px w-[85%] justify-center ${
                  isDark ? "bg-[#4b5563]" : "bg-[#d1d5db]"
                }`}
              />
              {isChartPage && (
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-[8px] border-none bg-transparent px-[14px] py-[10px] text-left text-[12px]! font-medium text-fg hover:bg-white/5 light:hover:bg-black/5"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate("/");
                  }}
                  title="Home"
                >
                  <FiHome size={15} />
                  <span>Home</span>
                </button>
              )}
              <button
                type="button"
                className="flex w-full cursor-pointer items-center gap-[8px] border-none bg-transparent px-[14px] py-[10px] text-left text-[12px]! font-medium text-fg hover:bg-white/5 light:hover:bg-black/5"
                role="menuitem"
                onClick={toggleTheme}
                title="Toggle theme"
              >
                {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
                <span>Theme</span>
              </button>
              <button
                type="button"
                className="flex w-full cursor-pointer items-center gap-[8px] border-none bg-transparent px-[14px] py-[10px] text-left text-[12px]! font-semibold text-[#ef5350] hover:bg-white/5 light:hover:bg-black/5"
                role="menuitem"
                onClick={handleLogout}
              >
                <FiLogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <>
              {isChartPage && (
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-[8px] border-none bg-transparent px-[14px] py-[10px] text-left text-[12px]! font-medium text-fg hover:bg-white/5 light:hover:bg-black/5"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate("/");
                  }}
                  title="Home"
                >
                  <FiHome size={15} />
                  <span>Home</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate("/login");
                }}
                className="flex w-full cursor-pointer items-center gap-[8px] border-none bg-transparent px-[14px] py-[12px] text-left text-[13px]! font-medium text-fg hover:bg-white/5 light:hover:bg-black/5"
                role="menuitem"
              >
                Sign in
              </button>
              <div
                className={`mx-auto flex h-px w-[85%] justify-center ${
                  isDark ? "bg-[#4b5563]" : "bg-[#d1d5db]"
                }`}
              />
              <button
                type="button"
                className="flex w-full cursor-pointer items-center gap-[8px] border-none bg-transparent px-[14px] py-[10px] text-left text-[12px]! font-medium text-fg hover:bg-white/5 light:hover:bg-black/5"
                role="menuitem"
                onClick={toggleTheme}
                title="Toggle theme"
              >
                {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
                <span>Theme</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChartHeaderProfileMenu;
