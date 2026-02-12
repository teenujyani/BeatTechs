import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/Hero1image.svg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="px-10 py-8">
      <div
        className="
          max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2
          items-center gap-10
          text-black dark:text-white
        "
      >
        <div className="ml-15 px-6 py-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Learn <br />
            Anything, <br />
            Anytime, <br />
            Anywhere
          </h1>

          <p className="mt-6 text-gray-600 dark:text-slate-300 max-w-md">
            Interactive online courses from top instructors
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/courses")}
              className="bg-indigo-500 text-white px-6 py-3 rounded-full  hover:bg-indigo-600 transition cursor-pointer">
              Explore
            </button>

            <button
              onClick={() => navigate("/login")}
              className="
                border border-gray-400 dark:border-white/40
                px-6 py-3 rounded-full
                hover:bg-gray-100 dark:hover:bg-white/10
                transition cursor-pointer
              "
            >
              Join Now
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-[90%] max-w-md transition-transform duration-300 hover:scale-125"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
