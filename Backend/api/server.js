require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

/* =====================================================
   JWT AUTHENTICATION ENDPOINTS
===================================================== */

// Register endpoint
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password required" });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .limit(1);

    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    const user = data[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Get user from database
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (error || !users || users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Verify token endpoint
app.get("/api/auth/verify", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({
      success: true,
      user: decoded,
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Logout endpoint (client-side mainly)
app.post("/api/auth/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});


/* =====================================================
   STRIPE CHECKOUT
===================================================== */

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { title, price, userId, userEmail, courseType, itemId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: title,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&user_id=${userId}&item_id=${itemId}&item_type=${courseType}&item_title=${encodeURIComponent(title)}&price=${price}`,

      cancel_url: `${process.env.FRONTEND_URL}/cancel`,

      customer_email: userEmail,

      metadata: {
        userId,
        itemTitle: title,
        itemType: courseType || "course",
        itemId,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});





/* =====================================================
   PURCHASE HELPERS
===================================================== */

async function userOwnsItem(userId, itemId) {
  const { data, error } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .eq("item_type", "course")
    .limit(1);

  if (error) throw error;

  return data.length > 0;
}





/* =====================================================
   SAVE PURCHASE
===================================================== */

app.post("/api/purchases", async (req, res) => {
  try {
    const {
      userId,
      itemId,
      itemType,
      itemTitle,
      price,
      stripeSessionId,
      parentCourseId,
    } = req.body;

    const alreadyOwned = await userOwnsItem(userId, itemId);

    if (alreadyOwned) {
      return res.json({
        success: true,
        duplicate: true,
        message: "Already purchased",
      });
    }

    const { data, error } = await supabase
      .from("purchases")
      .insert([
        {
          user_id: userId,
          item_id: itemId,
          item_type: itemType || "course",
          item_title: itemTitle,
          price,
          stripe_session_id: stripeSessionId,
          parent_course_id: parentCourseId || null,
        },
      ])
      .select();

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Purchase error:", error);
    res.status(500).json({ error: error.message });
  }
});





/* =====================================================
   GET USER PURCHASES
===================================================== */

app.get("/api/purchases/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .eq("user_id", userId)
      .order("purchased_at", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Fetch purchases error:", error);
    res.status(500).json({ error: error.message });
  }
});





/* =====================================================
   CHECK OWNERSHIP (THIS FIXES YOUR REDIRECT BUG)
===================================================== */

app.get("/api/purchases/check/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const { data, error } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .eq("item_type", "course")
      .limit(1);

    if (error) throw error;

    res.json({
      success: true,
      owned: data.length > 0,
    });
  } catch (error) {
    console.error("Ownership check error:", error);
    res.status(500).json({ error: error.message });
  }
});





/* =====================================================
   COURSE CONTENT
===================================================== */

app.get("/api/content/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    const { data, error } = await supabase
      .from("course_content")
      .select("*")
      .eq("course_id", courseId)
      .order("section_number")
      .order("order_index");

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Content error:", error);
    res.status(500).json({ error: error.message });
  }
});





/* =====================================================
   COURSE PROGRESS
===================================================== */

app.get("/api/progress/:userId/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const { data, error } = await supabase
      .from("course_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (error) throw error;

    const { data: content } = await supabase
      .from("course_content")
      .select("id")
      .eq("course_id", courseId);

    const totalVideos = content?.length || 0;
    const completedVideos = data?.filter((v) => v.completed).length || 0;

    res.json({
      success: true,
      progress: data,
      stats: {
        totalVideos,
        completedVideos,
        completionPercentage:
          totalVideos === 0
            ? 0
            : Math.round((completedVideos / totalVideos) * 100),
      },
    });
  } catch (error) {
    console.error("Progress error:", error);
    res.status(500).json({ error: error.message });
  }
});





/* =====================================================
   UPDATE VIDEO PROGRESS
===================================================== */

app.post("/api/progress", async (req, res) => {
  try {
    const { userId, courseId, videoId, videoTitle, completed, watchTime } =
      req.body;

    const { data, error } = await supabase
      .from("course_progress")
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          video_id: videoId,
          video_title: videoTitle,
          completed: completed || false,
          watch_time: watchTime || 0,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,course_id,video_id",
        }
      )
      .select();

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Progress update error:", error);
    res.status(500).json({ error: error.message });
  }
});





/* =====================================================
   SERVER START
===================================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});