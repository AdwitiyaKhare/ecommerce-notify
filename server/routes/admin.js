import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/orders", async (req, res) => {
  const adminEmails = process.env.ADMIN_EMAILS.split(",");
  if (!req.user || !adminEmails.includes(req.user.email)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
