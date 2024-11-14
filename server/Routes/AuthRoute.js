import { Router } from "express";
import {
  register,
  login,
  users,
  elections,
  candidates,
  phase,
  votingMail,
  a,
} from "../Controller/AuthController.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const router = Router();

// Email transporter configuration for nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Temporary storage for OTPs (use a more persistent storage in production)
const otps = {};

// Route to send OTP
router.post("/sendOtp", async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

  // Store OTP temporarily
  otps[email] = otp;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Route to verify OTP
router.post("/verifyOtp", (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP is valid
  if (otps[email] && otps[email] === otp) {
    delete otps[email]; // Clear OTP after successful verification
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

// Existing routes
router.post("/register", register.validator, register.controller);
router.post("/election/register", elections.register);
router.post("/phase/edit/:id", phase.controller);
router.get("/voting/elections", elections.voting);
router.get("/result/elections", elections.result);
router.post("/login", login.validator, login.controller);
router.post("/candidate/register", candidates.register);
router.get("/candidate/:username", candidates.getCandidate);
router.get("/candidates", candidates.getCandidates);
router.get("/candidate/delete/:id", candidates.delete);
router.get("/elections", elections.controller);
router.get("/election/:id", elections.getElection);
router.get("/election/delete/:id", elections.delete);
router.get("/users", users.getUsers);
router.get("/user/:id", users.getUser);
router.get("/user/username/:id", users.getUserByName);
router.get("/user/delete/:id", users.delete);
router.post("/user/edit/:id", users.edit);
router.post("/op", a.sc);
router.post("/votingEmail", votingMail.send);

export default router;
