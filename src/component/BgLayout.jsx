import React from "react";
import whitebgCircle from "../assets/WhiteCircle.svg";

const BgLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#060b3c] overflow-hidden">
      <img
        src={whitebgCircle}
        alt="Background decoration"
        className="blur-2xl  absolute bottom-0 -right-10 w-125 h-125 opacity-80 pointer-events-none "
      />
      <img
        src={whitebgCircle}
        alt="Background decoration"
        className="blur-2xl  absolute top-5 -left-35 w-125 h-125 opacity-80 pointer-events-none "
      />

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BgLayout;
