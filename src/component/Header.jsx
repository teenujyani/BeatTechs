import React from "react";
import { Link } from "react-router-dom";
import nightModeIcon from "../assets/light-mode.png";

const Header = () => {
  return (
    <header className="w-full flex justify-between sticky top-0 z-50
     items-center px-10 py-4 text-white bg-[#060b3c]/80 backdrop-blur-md">

      <Link
        to="/"
        className="text-3xl font-bold hover:underline hover:text-blue-400 transition duration-200"
      >
        EduTech
      </Link>

      <nav className="flex gap-8 text-lg">
        <Link to="/" className="hover:text-blue-400 font-bold">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-400 font-bold">
          About
        </Link>
        <Link to="/courses" className="hover:text-blue-400 font-bold">
          Courses
        </Link>
        <Link to="/contact" className="hover:text-blue-400 font-bold">
          Contact
        </Link>
      </nav>

      <div className="flex gap-6 items-center">
        <span className="cursor-pointer hover:text-blue-400">Login</span>
        <button className="px-4 py-2 rounded-full text-white hover:bg-blue-800">
          Sign Up
        </button>
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
