import React from "react";
import whitebgCircle from "../assets/WhiteCircle.svg";

const SectionBg = ({ children }) => {
  return (
    <div className="
      relative min-h-screen overflow-hidden
      bg-white text-black
      dark:bg-[#060b3c] dark:text-white
    ">
      <img
        src={whitebgCircle}
        alt="Background decoration"
        className="
          blur-2xl absolute bottom-0 -right-10 w-125 h-125
          pointer-events-none
          dark:opacity-80 opacity-60
        "
      />
      <img
        src={whitebgCircle}
        alt="Background decoration"
        className="
          blur-2xl absolute -top-50 -left-60 w-125 h-125
          pointer-events-none
          dark:opacity-80 opacity-60
        "
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SectionBg;
