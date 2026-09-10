import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
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
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;