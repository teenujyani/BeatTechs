import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import BgLayout from "../component/BgLayout";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

const stripePromise = loadStripe("pk_test_51T5RtuDOjuBh0wWay1Otmo2X20Iv1XlKmhhkMcaAol9ItvWQ5blwouUjeor8kKYEloRoXZJ1U0DTAygkspZeAEQW00Sje5yjP6");

const Checkout = () => {
  const { state: course } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!course) {
    return (
      <BgLayout>
        <div className="min-h-screen flex items-center justify-center text-white">
          No course selected
        </div>
      </BgLayout>
    );
  }

  const handlePayment = async () => {
    // Check if user is logged in
    if (!user) {
      navigate("/login", { state: { from: "/checkout", course } });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: course.title,
          price: parseInt(course.price.replace(/[^0-9]/g, "")),
          userId: user.id,
          userEmail: user.email,
          courseType: course.type || 'course',
          itemId: course.id || course.title // Pass course ID
        })
      });

      const data = await response.json();

      if (!data.id) {
        throw new Error("Failed to create checkout session");
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <BgLayout>
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl p-8 w-[400px] shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">{course.desc}</p>
          <p className="font-semibold text-lg mb-6 text-gray-900 dark:text-white">{course.price}</p>

          <button
            onClick={handlePayment}
            className="w-full bg-[#7dd3d8] py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Proceed to Pay
          </button>
        </div>
      </section>
    </BgLayout>
  );
};

export default Checkout;
