import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/tempauthContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Navbar({ toggleTheme, isDarkMode }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50
        bg-white/70 dark:bg-gray-800/70
        backdrop-blur-md shadow border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 select-none"
        >
          CodeDine
        </Link>

        <div className="flex items-center space-x-6 text-lg md:text-xl">
          <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <SunIcon className="w-7 h-7 text-yellow-400" />
            ) : (
              <MoonIcon className="w-7 h-7 text-gray-700" />
            )}
          </button>

          {user ? (
            <>
              <span className="text-gray-900 dark:text-gray-200 font-semibold select-none">
                Hello, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-900 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 font-semibold transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
