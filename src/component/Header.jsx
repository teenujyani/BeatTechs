import React from "react";
import nightModeIcon from "../assets/light-mode.png";
const Header = () => {
  return (
    <header className="w-full flex justify-between sticky top-0 z-50
     items-center px-10 py-4  text-white bg-[#060b3c]/80 backdrop-blur-md">
      <h2 className="text-3xl font-bold hover:underline hover:text-blue-400 cursor-pointer transition duration-200">
        EduTech
      </h2>
      <nav className="flex gap-8 text-lg">
        <span className="cursor-pointer hover:text-blue-400  font-bold">Home</span>
        <span className="cursor-pointer hover:text-blue-400 font-bold">About</span>
        <span className="cursor-pointer hover:text-blue-400 font-bold">Courses</span>
        <span className="cursor-pointer hover:text-blue-400 font-bold">Contact</span>
      </nav>
      <div className="flex gap-6 items-center">
        <span className="cursor-pointer hover:text-blue-400">Login</span>
        <button className=" px-4 py-2 rounded-full text-white hover:bg-blue-800 cursor-pointer">
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
