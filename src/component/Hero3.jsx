import { useState } from "react";
import { supabase } from "../supabaseClient";

const Hero3 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    college: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("interest_forms").insert([formData]);

    if (error) {
      alert(error.message);
    } else {
      alert("Interest submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        college: "",
      });
    }
  };

  return (
    <section className="px-10 py-16">
      <div
        className="
          max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2
          items-center gap-10
          text-black dark:text-white
        "
      >
        <div className="ml-15 px-6 py-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Learn From <br /> Our Experts
          </h1>

          <p className="mt-6 text-gray-600 dark:text-slate-300 max-w-md">
            Master your skills with the guidance from our experts.
          </p>
        </div>
        <div className="w-full max-w-md bg-white rounded-4xl p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Send your interest
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            We’ll get back to you shortly
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-gray-100 px-5 py-3 rounded-xl outline-none
                         text-gray-800 placeholder-gray-500
                         focus:ring-2 focus:ring-[#7dd3d8]"
              required
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full bg-gray-100 px-5 py-3 rounded-xl outline-none
                         text-gray-800 placeholder-gray-500
                         focus:ring-2 focus:ring-[#7dd3d8]"
              required
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full bg-gray-100 px-5 py-3 rounded-xl outline-none
                         text-gray-800 placeholder-gray-500
                         focus:ring-2 focus:ring-[#7dd3d8]"
            />

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-gray-100 px-5 py-3 rounded-xl outline-none
                         text-gray-800
                         focus:ring-2 focus:ring-[#7dd3d8]"
              required
            >
              <option value="">Select your subject</option>
              <option>Web Development</option>
              <option>Data Science</option>
              <option>AI / ML</option>
            </select>

            <input
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="University / College"
              className="w-full bg-gray-100 px-5 py-3 rounded-xl outline-none
                         text-gray-800 placeholder-gray-500
                         focus:ring-2 focus:ring-[#7dd3d8]"
            />

            <button
              type="submit"
              className="w-full mt-4 bg-[#7dd3d8] text-gray-900 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Send Interest
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero3;
