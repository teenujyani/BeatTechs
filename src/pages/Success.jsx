import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BgLayout from "../component/BgLayout";

const Success = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savePurchase = async () => {
      try {
        const sessionId = searchParams.get("session_id");
        const userId = searchParams.get("user_id");
        const itemId = searchParams.get("item_id");
        const itemType = searchParams.get("item_type");
        const itemTitle = searchParams.get("item_title");
        const price = searchParams.get("price");

        if (!userId || !itemId || !itemTitle) {
          throw new Error("Missing purchase information");
        }

        // Check if already saved in this session
        const purchaseKey = `purchase_saved_${sessionId}`;
        if (sessionStorage.getItem(purchaseKey)) {
          setSaving(false);
          return;
        }

        // Save purchase to database
        const response = await fetch("http://localhost:5000/api/purchases", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            itemId,
            itemType: itemType || "course",
            itemTitle: decodeURIComponent(itemTitle),
            price: parseInt(price),
            stripeSessionId: sessionId
          })
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to save purchase");
        }

        // Mark as saved in sessionStorage
        sessionStorage.setItem(purchaseKey, "true");

        // Log activity only if not a duplicate
        if (!data.duplicate) {
          await fetch("http://localhost:5000/api/activity", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId,
              date: new Date().toISOString().split('T')[0]
            })
          });
        }

        setSaving(false);
      } catch (err) {
        console.error("Error saving purchase:", err);
        setError(err.message);
        setSaving(false);
      }
    };

    if (user) {
      savePurchase();
    }
  }, [searchParams, user]);

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <BgLayout>
      <div className="min-h-screen flex items-center justify-center text-white px-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 max-w-md text-center">
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#7dd3d8] mx-auto mb-6"></div>
              <h1 className="text-2xl font-bold mb-2">Processing Purchase...</h1>
              <p className="text-white/70">Please wait while we save your purchase.</p>
            </>
          ) : error ? (
            <>
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold mb-2 text-red-400">Error Saving Purchase</h1>
              <p className="text-white/70 mb-6">{error}</p>
              <button
                onClick={goToDashboard}
                className="px-6 py-3 rounded-full bg-[#7dd3d8] text-[#050b3a] font-semibold hover:opacity-90 transition"
              >
                Go to Dashboard
              </button>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
              <p className="text-white/70 mb-8">
                Your course has been added to your dashboard. Start learning now!
              </p>
              <button
                onClick={goToDashboard}
                className="px-8 py-3 rounded-full bg-[#7dd3d8] text-[#050b3a] font-semibold hover:opacity-90 transition"
              >
                Go to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </BgLayout>
  );
};

export default Success;
