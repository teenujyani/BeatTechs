import React from "react";
import hero2Img from "../assets/Hero2image.svg";
import { useNavigate } from "react-router-dom";

const Hero2 = () => {
  const navigate = useNavigate();
  return (
    <section className="px-10 py-24">
      <div className="
        max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2
        items-center gap-16
        text-black dark:text-white
      ">
        <div className="flex justify-center">
          <img
            src={hero2Img}
            alt="Analytics Illustration"
            className="w-[90%] max-w-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div>
          <p className="uppercase tracking-widest text-gray-500 dark:text-slate-300 text-sm mb-4">
            Analytics
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Unlock Your <br /> Potential With <br /> Interactive Learning
          </h2>

          <p className="mt-6 text-gray-600 dark:text-slate-300 max-w-md">
            Learn from top mentors, practice with real projects, and earn certificates that matter.
          </p>

          <button onClick={()=>navigate("/courses")}
           className="mt-8 bg-indigo-400 text-white px-10 py-3 rounded-full hover:bg-indigo-500 transition cursor-pointer">
            Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
