import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import BgLayout from "../component/BgLayout";

const stripePromise = loadStripe("pk_test_51Sze1ZLbXilQKU3CT24MSpriwsptkNuDpPknXqff0t4QBYlSKitAHccqvmZRrmVWI0tHREXF6Nxz3dCmZ8CAZz7W00p62VRiUj");

const Checkout = () => {
  const { state: course } = useLocation();

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
    const response = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: course.title,
        price: parseInt(course.price.replace(/[^0-9]/g, ""))
      })
    });

    const data = await response.json();

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: data.id
    });
  };

  return (
    <BgLayout>
      <section className="min-h-screen flex items-center justify-center text-white px-6">
        <div className="bg-white text-black rounded-2xl p-8 w-[400px] shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
          <p className="mb-4">{course.desc}</p>
          <p className="font-semibold text-lg mb-6">{course.price}</p>

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
