import { useRef } from "react";
import BgLayout from "../component/BgLayout";
import { courses, workshops } from "../data/courseData";

const Course = () => {
  const courseRef = useRef(null);
  const workshopRef = useRef(null);

  return (
    <BgLayout>
      <section className="px-10 py-20 text-white">

        {/* TOP BUTTONS */}
        <div className="flex justify-center gap-6 mb-16">
          <button
            onClick={() =>
              courseRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-2 rounded-full bg-[#7dd3d8] text-black font-semibold"
          >
            Our Courses
          </button>

          <button
            onClick={() =>
              workshopRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-2 rounded-full border border-[#7dd3d8]"
          >
            Our Workshops
          </button>
        </div>

        {/* ================= COURSES ================= */}
        <div ref={courseRef}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Courses
          </h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                {/* IMAGE */}
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <h2 className="text-2xl font-semibold mb-2">
                  {course.title}
                </h2>

                <p className="text-white/70 text-sm mb-6">
                  {course.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {course.price}
                  </span>

                  <button className="enroll-btn">
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= WORKSHOPS ================= */}
        <div ref={workshopRef} className="mt-32">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Workshops
          </h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {workshops.map((workshop, index) => (
              <div key={index} className="course-card">
                {/* IMAGE */}
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <h2 className="text-2xl font-semibold mb-2">
                  {workshop.title}
                </h2>

                <p className="text-white/70 text-sm mb-6">
                  {workshop.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {workshop.price}
                  </span>

                  <button className="enroll-btn">
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </BgLayout>
  );
};

export default Course;
