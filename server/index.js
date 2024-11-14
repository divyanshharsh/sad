// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import Auth from "./Routes/AuthRoute.js";
// import cors from "cors";


// dotenv.config();
// const app = express();
// app.use(express.json());
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use("/api/auth", Auth);

// // OTP routes added



// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("Connected With DB Successfully"))
//   .catch((e) => console.log("DB Connection Failed"));

// app.listen(port, () => {
//   console.log(`Server is Listening on PORT ${port}`);
// });


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Auth from "./Routes/AuthRoute.js";
import cors from "cors";
import nodemailer from "nodemailer";
import crypto from "crypto";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

// Import your User model
import User from "./Models/User.js"; // Adjust the path as needed

// Email transporter configuration for nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// OTP storage (In production, you might use a database or Redis for this)
const otps = {};

// Route to send OTP
app.post("/api/sendOtp", async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

  // Store OTP temporarily (you can also associate it with the user in the database)
  otps[email] = otp;

  // Send OTP email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`, // Use backticks for template literals
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
app.post("/api/verifyOtp", (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP matches
  if (otps[email] && otps[email] === otp) {
    delete otps[email]; // Clear OTP after verification
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

// Existing routes and DB connection
app.use("/api/auth", Auth);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected With DB Successfully"))
  .catch((e) => console.error("DB Connection Failed:", e));

app.listen(port, () => {
  console.log(`Server is Listening on PORT ${port}`);
});
