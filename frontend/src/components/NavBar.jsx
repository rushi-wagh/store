import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const guestLinks = [
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

const NavBar = () => {
  const user = useAuthStore((state) => state.authUser);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const dashboardPath =
    user?.role === "SYSTEM_ADMINISTRATOR"
      ? "/admin-dashboard"
      : user?.role === "STORE_OWNER"
      ? "/owner-dashboard"
      : "/dashboard";

  const links = user
    ? [
        { label: "Home", to: "/" },
        { label: "Dashboard", to: dashboardPath },
      ]
    : guestLinks;

  return (
    <nav className="w-full h-16 px-8 bg-[#0b0b0f] border-b border-[#2a2a35]">
      <div className="max-w-7xl h-full mx-auto flex items-center justify-between">
        <NavLink
          to="/"
          className="text-2xl font-bold text-[#e50914]"
        >
          MULYANKANAM
        </NavLink>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;