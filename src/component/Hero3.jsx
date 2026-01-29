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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("interest_forms").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        college: formData.college,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 text-white">
        
        {/* Text */}
        <div className="ml-15 px-6 py-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Learn From <br /> Our Experts
          </h1>

          <p className="mt-6 text-slate-300 max-w-md leading-relaxed">
            Master your skills with the guidance from our experts.
          </p>
        </div>

        {/* Interest Form */}
        <div className="bg-[#060b3c]/90 backdrop-blur-md text-white rounded-2xl p-10 w-full max-w-md shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Send your interest
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 outline-none"
              required
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 outline-none"
              required
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 outline-none"
            />

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 outline-none"
              required
            >
              <option value="">Select your subject</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="AI / ML">AI / ML</option>
            </select>

            <input
              name="college"
              value={formData.college}
              onChange={handleChange}
              type="text"
              placeholder="University / College"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 outline-none"
            />

            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 py-3 rounded-full font-semibold transition"
            >
              SEND INTEREST
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero3;
