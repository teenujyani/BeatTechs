// ===== COURSE IMAGES =====
import dsImg from "../assets/courses/DataSci.png";
import pyImg from "../assets/courses/Python.png";
import cppImg from "../assets/courses/cpp.png";
import mlImg from "../assets/courses/ML.png";
import aiImg from "../assets/courses/AI.png";
import iotImg from "../assets/courses/IOT.png";

// ===== COURSES =====
export const courses = [
  {
    title: "Data Science",
    price: "₹4,999",
    desc: "Transform data into insights using Python and ML.",
    image: dsImg,
  },
  {
    title: "Python Programming",
    price: "₹2,999",
    desc: "From basics to advanced Python programming.",
    image: pyImg,
  },
  {
    title: "C++ Programming",
    price: "₹3,499",
    desc: "Build strong foundations in C++ and OOPs.",
    image: cppImg,
  },
  {
    title: "Machine Learning",
    price: "₹6,999",
    desc: "Learn ML algorithms and real-world applications.",
    image: mlImg,
  },
  {
    title: "Artificial Intelligence",
    price: "₹7,999",
    desc: "Understand AI concepts, neural networks, and NLP.",
    image: aiImg,
  },
  {
    title: "Electronics & IoT",
    price: "₹5,499",
    desc: "Learn sensors, circuits, and IoT systems.",
    image: iotImg,
  },
];

// ===== WORKSHOPS (REUSING COURSE IMAGES) =====
export const workshops = [
  {
    title: "AI Bootcamp",
    price: "₹999",
    desc: "Hands-on AI workshop with real projects.",
    image: aiImg,
  },
  {
    title: "Web Dev Bootcamp",
    price: "₹1,299",
    desc: "Build full-stack websites in 3 days.",
    image: pyImg,
  },
  {
    title: "IoT Hands-on",
    price: "₹1,499",
    desc: "Work with sensors and microcontrollers.",
    image: iotImg,
  },
  {
    title: "Data Analytics Sprint",
    price: "₹1,199",
    desc: "Analyze and visualize real datasets.",
    image: dsImg,
  },
];
