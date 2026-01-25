import React from "react";

const Hero3 = () => {
  return (
    <section className="px-10 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 text-white">
        {/* Text */}
        <div className="ml-15 px-6 py-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Learn From <br />
            Our Experts
          </h1>

          <p className="mt-6 text-slate-300 max-w-md leading-relaxed">
            Master your skills with the guidance from our experts. Learn
            directly from qualified professionals who know what it takes to
            succeed. Enroll for our courses now!
          </p>
        </div>

        {/* Interest Form */}
        <div className="bg-[#060b3c]/90 backdrop-blur-md text-white rounded-2xl p-10 w-full max-w-md shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Send your interest
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              placeholder="Phone (+91-1234567890)"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select your subject</option>
              <option>Web Development</option>
              <option>Data Science</option>
              <option>AI / ML</option>
            </select>

            <input
              type="text"
              placeholder="University / College"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
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
