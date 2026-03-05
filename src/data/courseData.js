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
    id: "data-science",
    title: "Data Science",
    price: "₹4,999",
    desc: "Transform data into insights using Python and ML.",
    image: dsImg,
    type: "course"
  },
  {
    id: "python-programming",
    title: "Python Programming",
    price: "₹2,999",
    desc: "From basics to advanced Python programming.",
    image: pyImg,
    type: "course"
  },
  {
    id: "cpp-programming",
    title: "C++ Programming",
    price: "₹3,499",
    desc: "Build strong foundations in C++ and OOPs.",
    image: cppImg,
    type: "course"
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    price: "₹6,999",
    desc: "Learn ML algorithms and real-world applications.",
    image: mlImg,
    type: "course"
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    price: "₹7,999",
    desc: "Understand AI concepts, neural networks, and NLP.",
    image: aiImg,
    type: "course"
  },
  {
    id: "electronics-iot",
    title: "Electronics & IoT",
    price: "₹5,499",
    desc: "Learn sensors, circuits, and IoT systems.",
    image: iotImg,
    type: "course"
  },
];

// ===== WORKSHOPS (REUSING COURSE IMAGES) =====
export const workshops = [
  {
    id: "ai-bootcamp",
    title: "AI Bootcamp",
    price: "₹999",
    desc: "Hands-on AI workshop with real projects.",
    image: aiImg,
    type: "workshop"
  },
  {
    id: "web-dev-bootcamp",
    title: "Web Dev Bootcamp",
    price: "₹1,299",
    desc: "Build full-stack websites in 3 days.",
    image: pyImg,
    type: "workshop"
  },
  {
    id: "iot-hands-on",
    title: "IoT Hands-on",
    price: "₹1,499",
    desc: "Work with sensors and microcontrollers.",
    image: iotImg,
    type: "workshop"
  },
  {
    id: "data-analytics-sprint",
    title: "Data Analytics Sprint",
    price: "₹1,199",
    desc: "Analyze and visualize real datasets.",
    image: dsImg,
    type: "workshop"
  },
];
