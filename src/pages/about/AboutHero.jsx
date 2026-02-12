import React from "react";
import HeroImage from "../../assets/Hero_about.svg";

const AboutHero = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-65">
        
        <img
          src={HeroImage}
          alt="About illustration"
          className="w-[420px]"
        />

        <div className="text-white max-w-xl">
          <h1 className="text-4xl font-bold mb-4">At EduSphere</h1>

          <p className="text-sm text-gray-200 mb-8 leading-relaxed">
            we believe that learning should be accessible, engaging, and career-focused.  Our mission is to empower students and professionals to master real-world skills through interactive, mentor-led online courses.
          </p>

          <h2 className="text-3xl font-semibold mb-3">Our Mission</h2>

          <p className="text-sm text-gray-200 mb-6">
            To make quality education available to everyone, everywhere, by connecting learners with industry experts and offering hands-on learning experiences that truly prepare them for the future.
          </p>

          <button className="px-6 py-2 rounded-full bg-[#7B78FF] text-white">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutHero;
