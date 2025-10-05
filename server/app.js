import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";
import "./config/passport.js";
import bodyParser from "body-parser";
import Stripe from "stripe";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Stripe Webhook must be placed BEFORE body-parser
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { email, client_reference_id, payment_intent } = session;

      const Order = (await import("./models/Order.js")).default;

      await Order.create({
        userEmail: email,
        productId: client_reference_id,
        paymentId: payment_intent,
      });

      // Email is handled in frontend
    }

    res.json({ received: true });
  }
);

// Now add middlewares AFTER webhook

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1); // trust first proxy (needed for Render/Vercel HTTPS)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true in production, false locally
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true, // prevents JS access
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);
app.use("/admin", adminRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
