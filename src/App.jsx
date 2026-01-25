import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Course from "./pages/Course";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
