import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">EduTech</h2>
          <p className="text-slate-400 max-w-sm">
            Learn anything, anytime, anywhere with modern and interactive courses.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-slate-300">
            <li className="cursor-pointer hover:text-white">Home</li>
            <li className="cursor-pointer hover:text-white">About</li>
            <li className="cursor-pointer hover:text-white">Courses</li>
            <li className="cursor-pointer hover:text-white">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-6 text-2xl">

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-pink-500 hover:scale-110 transition-transform"
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:scale-110 transition-transform"
            >
              <FaTwitter />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:scale-110 transition-transform"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-red-500 hover:scale-110 transition-transform"
            >
              <FaYoutube />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} EduTech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
