import React from "react";

const Contactform = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      
      <div
        className="
          w-full max-w-2xl
          bg-white
          rounded-4xl
          p-10
          shadow-2xl
        "
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Send your query
        </h2>

        <p className="text-sm text-gray-500 mb-8">
          Feel free to reach out if you have any questions or need clarification.
          We will respond within 24 hours.
        </p>
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="
                w-full bg-gray-100
                px-5 py-3 rounded-xl
                outline-none
                focus:ring-2 focus:ring-[#7dd3d8]
              "
            />

            <input
              type="tel"
              placeholder="Phone (+91-1234567890)"
              className="
                w-full bg-gray-100
                px-5 py-3 rounded-xl
                outline-none
                focus:ring-2 focus:ring-[#7dd3d8]
              "
            />
          </div>
          <input
            type="text"
            placeholder="Your Query"
            className="
              w-full bg-gray-100
              px-5 py-3 rounded-xl
              outline-none
              focus:ring-2 focus:ring-[#7dd3d8]
            "
          />
          <input
            type="email"
            placeholder="Your Email"
            className="
              w-full bg-gray-100
              px-5 py-3 rounded-xl
              outline-none
              focus:ring-2 focus:ring-[#7dd3d8]
            "
          />
          <textarea
            rows="5"
            placeholder="Write your message here..."
            className="
              w-full bg-gray-100
              px-5 py-3 rounded-xl
              outline-none
              resize-none
              focus:ring-2 focus:ring-[#7dd3d8]
            "
          />
          <button
            type="submit"
            className="
              w-full bg-[#7dd3d8]
              py-3 rounded-full
              font-semibold text-gray-900
              hover:opacity-90
              transition
              cursor-pointer
            "
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contactform;
