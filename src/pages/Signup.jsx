import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { jwtAuth } from "../utils/jwtAuth";
import { useNavigate } from "react-router-dom";
import Google from "../assets/google.png";

const Signup = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Try JWT registration first (if backend supports it)
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        jwtAuth.setToken(data.token, data.user);
        setToken(data.token);
        setUser(data.user);
        navigate("/dashboard");
        return;
      }

      // Fallback to Supabase
      const { error: supError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (supError) {
        setError(supError.message);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
      setError("Google signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#050b3a] to-[#3a2a8f]">
      <div className="w-full max-w-md bg-[#0b1250] rounded-[32px] p-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white">
          Create <br /> Account
        </h2>

        <p className="text-sm text-gray-400 mt-2 mb-8">
          Sign up to start learning
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-900 text-white px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7dd3d8] placeholder-gray-500"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 text-white px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7dd3d8] placeholder-gray-500"
            required
          />

          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-900 text-white px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7dd3d8] placeholder-gray-500"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-900 text-white px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7dd3d8] placeholder-gray-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7dd3d8] py-3 rounded-full font-semibold text-gray-900 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <button 
          type="button"
          onClick={handleGoogleSignup}
          className="w-full mt-4 border-2 border-gray-600 py-3 rounded-full flex justify-center gap-3 text-white hover:bg-gray-900 transition"
        >
          <img src={Google} alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#7dd3d8] font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
