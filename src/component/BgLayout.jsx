import React from "react";
import whitebgCircle from "../assets/WhiteCircle.svg";

const BgLayout = ({ children }) => {
  return (
    <div
      className="
        relative min-h-screen overflow-hidden
        bg-white dark:bg-[#060b3c]
        transition-colors duration-300
      "
    >
      {/* LEFT CIRCLE */}
      <img
        src={whitebgCircle}
        alt="Background decoration"
        className="
          absolute bottom-0 -right-10 w-125 h-125 blur-2xl opacity-80
          pointer-events-none
        "
      />

      {/* RIGHT CIRCLE */}
      <img
        src={whitebgCircle}
        alt="Background decoration"
        className="
          absolute top-5 -left-35 w-125 h-125 blur-2xl opacity-80
          pointer-events-none
        "
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BgLayout;
