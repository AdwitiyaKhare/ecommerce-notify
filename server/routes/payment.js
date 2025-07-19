import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

router.post("/create-checkout-session", async (req, res) => {
  const { price, productId, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Product ${productId}` },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      client_reference_id: productId,
      metadata: {
        productId,
        email,
      },
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: "Payment session failed" });
  }
});

// NEW: Retrieve session metadata safely for frontend
router.get("/session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    res.json({
      email: session.metadata.email,
      productId: session.metadata.productId,
      paymentId: session.payment_intent,
    });
  } catch (err) {
    console.error("Error retrieving Stripe session:", err.message);
    res.status(500).json({ error: "Unable to retrieve session" });
  }
});

export default router;
