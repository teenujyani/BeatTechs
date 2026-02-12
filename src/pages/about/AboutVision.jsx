import VisionImg from "../../assets/img_about.png";

const AboutVision = () => {
  return (
    <section className="bg-[#1C8A87] py-60">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-16">

        {/* Text */}
        <div className="text-white">
          <h3 className="font-semibold mb-2">🌍 Our Vision</h3>
          <p className="text-sm mb-6">
            To build a global learning ecosystem where curiosity never stops — and where anyone can learn, grow, and achieve their goals without limits.
          </p>

          <h3 className="font-semibold mb-2">📘 What We Do</h3>
          <p className="text-sm mb-6">
            We offer a wide range of courses in technology, design, business, and personal development, designed by top mentors and industry leaders. Our platform combines video lessons, interactive quizzes, project-based learning, and certifications that help you build a strong professional portfolio.
          </p>

          <h3 className="font-semibold mb-2">⭐ Core Values</h3>
          <ul className="text-sm space-y-2 list-disc pl-5">
            <li>Learn by Doing – We believe practical learning creates deeper understanding.</li>
            <li>Expert Guidance – Learn from mentors who’ve done it before.</li>
            <li>Community & Collaboration – Learning grows faster when shared.</li>
            <li>Growth Mindset – Every learner can improve with the right guidance.</li>
          </ul>
        </div>

        {/* Image */}
        <img
          src={VisionImg}
          alt="Vision"
          className="rounded-2xl"
        />

      </div>
    </section>
  );
};

export default AboutVision;
