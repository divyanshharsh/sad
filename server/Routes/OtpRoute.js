import express from "express";
import { sendOtpEmail } from "../controllers/otpController.js";

const router = express.Router();

// OTP route to send OTP via email
router.post("/EmailOTP", sendOtpEmail);

export default router;
