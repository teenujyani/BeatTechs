import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { jwtAuth } from "../utils/jwtAuth";
import { MdEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import SignupImg from "../assets/Signup_img.png";
import Google from "../assets/google.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Try JWT authentication first (if backend supports it)
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        jwtAuth.setToken(data.token, data.user);
        setToken(data.token);
        setUser(data.user);
        navigate("/dashboard");
        return;
      }

      // Fallback to Supabase authentication
      const { error: supError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (supError) {
        setError(supError.message);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Google login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center gap-24 px-32 bg-linear-to-br from-[#050b3a] to-[#3a2a8f]">
      
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex w-1/2 justify-center">
        <img src={SignupImg} alt="Learning Illustration" className="max-w-lg" />
      </div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-[#0b1250] rounded-[32px] p-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white">
          Let's <br /> Start Learning
        </h2>

        <p className="text-sm text-gray-400 mt-2 mb-8">
          Please login or sign up to continue
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-xl text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-900 text-white px-5 py-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-[#7dd3d8] placeholder-gray-500"
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
              className="w-full bg-gray-900 text-white px-5 py-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-[#7dd3d8] placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7dd3d8] py-3 rounded-full font-semibold text-gray-900 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-4 border-2 border-gray-600 py-3 rounded-full flex justify-center gap-3 text-white hover:bg-gray-900 transition"
        >
          <img src={Google} alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#7dd3d8] font-medium hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
