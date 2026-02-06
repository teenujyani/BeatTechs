import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { MdEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import SignupImg from "../assets/Signup_img.png";
import Google from "../assets/google.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      navigate("/dashboard"); // ✅ redirect after login
    }
  };

  return (
    <div className="min-h-screen flex items-center gap-24 px-32 bg-linear-to-br from-[#050b3a] to-[#3a2a8f]">
      
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex w-1/2 justify-center">
        <img src={SignupImg} alt="Learning Illustration" className="max-w-lg" />
      </div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white rounded-[32px] p-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-900">
          Let’s <br /> Start Learning
        </h2>

        <p className="text-sm text-gray-500 mt-2 mb-8">
          Please login or sign up to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-100 px-5 py-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-[#7dd3d8]"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-100 px-5 py-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-[#7dd3d8]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7dd3d8] py-3 rounded-full font-semibold text-gray-900"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button className="w-full mt-4 border-2 border-gray-300 py-3 rounded-full flex justify-center gap-3">
          <img src={Google} alt="Google" className="w-5 h-5" />
          Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#7dd3d8] font-medium">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
