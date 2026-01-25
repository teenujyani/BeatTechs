import React from "react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#050b3a] to-[#3a2a8f]">
      <div className="bg-[#060b3c]/80 backdrop-blur-md p-10 rounded-xl w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-md bg-slate-800 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-md bg-slate-800 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-md bg-slate-800 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* ✅ NEW: Confirm Password */}
          <div>
            <label className="block mb-1 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-md bg-slate-800 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-full font-semibold transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-slate-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
