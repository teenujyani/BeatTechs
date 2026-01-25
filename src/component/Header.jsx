import React from "react";
import { NavLink } from "react-router-dom";
import nightModeIcon from "../assets/light-mode.png";

const Header = () => {
  const baseLink = "relative font-bold transition duration-200";

  const activeLink =
    "text-blue-400 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-400";

  const inactiveLink = "text-white hover:text-blue-400";

  return (
    <header
      className="w-full flex justify-between sticky top-0 z-50
      items-center px-10 py-4 bg-[#060b3c]/80 backdrop-blur-md"
    >
      <NavLink
        to="/"
        className="text-3xl font-bold text-white hover:text-blue-400 transition"
      >
        EduTech
      </NavLink>

      <nav className="flex gap-8 text-lg">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Courses
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Contact
        </NavLink>
      </nav>
      <div className="flex gap-6 items-center text-white">
        <NavLink
          to="/login"
          className="hover:text-blue-400 transition"
        >
          Login
        </NavLink>

        <NavLink
          to="/signup"
          className="px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Sign Up
        </NavLink>

        <button className="p-2 rounded-full hover:bg-slate-700 transition hover:scale-150 duration-200">
          <img
            src={nightModeIcon}
            alt="Toggle Night Mode"
            className="w-6 h-6"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
