import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // we will create this context
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // optional light/dark icons

export default function Navbar({ toggleTheme, isDarkMode }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex items-center justify-between max-w-6xl mx-auto">
   <div className="max-w-6xl w-full mx-auto flex items-center justify-between px-4">

      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
      LeetCode
    </Link>

      {/* Optional: Add SearchBar here or keep it on main page */}
      {/* <SearchBar /> */}

      <div className="flex items-center space-x-4">
        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {user ? (
          <>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Hello, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
              >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold"
              >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
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
