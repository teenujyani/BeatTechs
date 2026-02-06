import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      navigate("/dashboard"); // ✅ redirect
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#050b3a] to-[#3a2a8f]">
      <div className="w-full max-w-md bg-white rounded-[32px] p-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-900">
          Create <br /> Account
        </h2>

        <p className="text-sm text-gray-500 mt-2 mb-8">
          Sign up to start learning
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-100 px-5 py-3 rounded-xl"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 px-5 py-3 rounded-xl"
            required
          />

          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 px-5 py-3 rounded-xl"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-100 px-5 py-3 rounded-xl"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7dd3d8] py-3 rounded-full font-semibold text-gray-900"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#7dd3d8] font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
