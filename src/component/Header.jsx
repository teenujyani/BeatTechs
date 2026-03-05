import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const userName =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const handleProfileClick = () => {
    navigate("/dashboard");
    setOpen((prev) => !prev);
  };

  return (
    <header className="w-full flex justify-between items-center px-10 py-4 sticky top-0 z-50 bg-[#060b3c]/90 dark:bg-[#060b3c]/80 backdrop-blur-md transition-colors duration-300">

      {/* LOGO → HOME */}
      <NavLink
        to="/"
        className="text-3xl font-bold text-gray-900 dark:text-white tracking-wide"
      >
        EduTech
      </NavLink>

      {/* NAV LINKS */}
      <nav className="flex gap-8 text-lg">
        <NavLink to="/" className="text-gray-900 dark:text-white hover:text-[#7dd3d8]">
          Home
        </NavLink>
        <NavLink to="/about" className="text-gray-900 dark:text-white hover:text-[#7dd3d8]">
          About
        </NavLink>
        <NavLink to="/courses" className="text-gray-900 dark:text-white hover:text-[#7dd3d8]">
          Courses
        </NavLink>
        <NavLink to="/contact" className="text-gray-900 dark:text-white hover:text-[#7dd3d8]">
          Contact
        </NavLink>
      </nav>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 relative">

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <NavLink to="/login" className="text-gray-900 dark:text-white hover:text-[#7dd3d8]">
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 rounded-full bg-[#7dd3d8] text-[#050b3a] hover:opacity-90 transition"
            >
              Sign up
            </NavLink>
          </>
        )}

        {/* LOGGED IN */}
        {user && (
          <div ref={dropdownRef} className="relative">

            {/* PROFILE CIRCLE (CLICK = DASHBOARD + DROPDOWN) */}
            <button
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full bg-[#7dd3d8] text-[#050b3a] font-bold flex items-center justify-center uppercase"
            >
              {userName.charAt(0)}
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#0b1250] rounded-xl shadow-xl overflow-hidden text-white text-sm z-50">
                
                <div className="px-4 py-2 border-b border-white/10 font-semibold">
                  {userName}
                </div>

                <button className="w-full px-4 py-2 text-left hover:bg-white/10">
                  Settings
                </button>

                <button className="w-full px-4 py-2 text-left hover:bg-white/10">
                  Switch account
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* THEME TOGGLE - REMOVED (Dark theme only) */}
      </div>
    </header>
  );
};

export default Header;
