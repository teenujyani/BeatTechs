import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgLayout from "../component/BgLayout";
import { courses, workshops } from "../data/courseData";

const Course = () => {
  const courseRef = useRef(null);
  const workshopRef = useRef(null);
  const navigate = useNavigate();
  const [showPurchaseOptions, setShowPurchaseOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(false);

  const handleEnroll = async (item) => {
    setSelectedItem(item);
    setShowPurchaseOptions(true);
    setLoadingModules(true);
    // Fetch modules/tests for this course/workshop
    try {
      const res = await fetch(`http://localhost:5000/api/modules/${item.id}`);
      const data = await res.json();
      setModules(data.data || []);
    } catch (err) {
      setModules([]);
    }
    setLoadingModules(false);
  };

  const handlePurchase = (purchaseItem, type = "course") => {
    // Go to checkout with correct item
    navigate("/checkout", { state: {
      ...purchaseItem,
      type,
      id: purchaseItem.id || purchaseItem.module_id || purchaseItem.test_id,
      title: purchaseItem.title || purchaseItem.module_title || purchaseItem.test_title,
      price: purchaseItem.price || purchaseItem.module_price || purchaseItem.test_price,
      parent_course_id: selectedItem.id
    }});
    setShowPurchaseOptions(false);
  };

  const handlePurchaseAll = () => {
    // Purchase whole course (course + modules + tests)
    handlePurchase(selectedItem, "course");
  };

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

        {/* COURSES */}
        <div ref={courseRef}>
          <h1 className="text-4xl font-bold text-center mb-16">
            Our Courses
          </h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
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

                  <button
                    className="enroll-btn"
                    onClick={() => handleEnroll(course)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WORKSHOPS */}
        <div ref={workshopRef} className="mt-32">
          <h1 className="text-4xl font-bold text-center mb-16">
            Our Workshops
          </h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {workshops.map((workshop, index) => (
              <div key={index} className="course-card">
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="h-full w-full object-cover"
                  />
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

                  <button
                    className="enroll-btn"
                    onClick={() => handleEnroll(workshop)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for purchase options */}
        {showPurchaseOptions && selectedItem && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                onClick={() => setShowPurchaseOptions(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">Choose What to Purchase</h2>
              <p className="mb-2 text-gray-600 dark:text-gray-300">{selectedItem.title}</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Full Course</span>
                  <span className="font-semibold">{selectedItem.price}</span>
                  <button
                    className="bg-[#7dd3d8] px-4 py-2 rounded-full font-semibold hover:opacity-90"
                    onClick={handlePurchaseAll}
                  >
                    Purchase Course
                  </button>
                </div>
                {loadingModules ? (
                  <div className="text-center py-4">Loading modules/tests...</div>
                ) : (
                  <>
                    {modules.filter(m => m.module_type === "module").length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Modules</h3>
                        {modules.filter(m => m.module_type === "module").map((mod) => (
                          <div key={mod.id} className="flex items-center justify-between mb-2">
                            <span>{mod.title}</span>
                            <span>{mod.module_price || "₹499"}</span>
                            <button
                              className="bg-[#7dd3d8] px-3 py-1 rounded-full font-semibold hover:opacity-90"
                              onClick={() => handlePurchase(mod, "module")}
                            >
                              Purchase Module
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {modules.filter(m => m.module_type === "test").length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Tests / Quizzes</h3>
                        {modules.filter(m => m.module_type === "test").map((test) => (
                          <div key={test.id} className="flex items-center justify-between mb-2">
                            <span>{test.title}</span>
                            <span>{test.test_price || "₹299"}</span>
                            <button
                              className="bg-[#7dd3d8] px-3 py-1 rounded-full font-semibold hover:opacity-90"
                              onClick={() => handlePurchase(test, "test")}
                            >
                              Purchase Test
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </section>
    </BgLayout>
  );
};

export default Course;
