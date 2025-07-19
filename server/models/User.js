import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
