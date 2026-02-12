const CourseCard = ({ title, description, price, onEnroll }) => {
  return (
    <div className="bg-white text-black rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>

      <div className="mt-6 flex justify-between items-center">
        <span className="font-semibold text-lg">₹{price}</span>
        <button
          onClick={onEnroll}
          className="bg-[#7dd3d8] px-4 py-2 rounded-full font-semibold"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
