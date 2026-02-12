import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Course from "./pages/Course";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Checkout from "./pages/Checkout";
import { useAuth } from "./context/AuthContext";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const App = () => {
  const { user, loading } = useAuth();

  // Optional: prevent flicker while auth is loading
  if (loading) return null;

  return (
    <>
      <ScrollToTop />

      {/* Header visible everywhere for now */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* PROTECTED DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
