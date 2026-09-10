import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../utils/api";

const guestLinks = [
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

const authLinks = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
];

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/", {
          withCredentials: true,
        });

        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, {
        withCredentials: true,
      });

      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <nav className="w-full h-16 px-8 bg-[#0b0b0f] border-b border-[#2a2a35]">
        <div className="max-w-7xl h-full mx-auto flex items-center">
          <NavLink
            to="/"
            className="text-2xl font-bold text-[#e50914]"
          >
            MULYANKANAM
          </NavLink>
        </div>
      </nav>
    );
  }

  const links = isLoggedIn ? authLinks : guestLinks;

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

          {isLoggedIn && (
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

