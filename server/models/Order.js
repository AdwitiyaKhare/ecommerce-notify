import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userEmail: String,
    productId: String,
    paymentId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
