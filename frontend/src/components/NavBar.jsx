import React from "react";
import { NavLink } from "react-router-dom";

const guestLinks = [
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

const authLinks = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Logout", to: "/logout" },
];

const NavBar = () => {
  const links = guestLinks;

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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;