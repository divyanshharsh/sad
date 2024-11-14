// Models/Otp.js
import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model("Otp", OtpSchema);
