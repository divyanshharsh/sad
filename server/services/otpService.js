// otpService.js
import twilio from "twilio";
import OtpModel from "../Models/Otp.js"; // Assume an Otp model for storing OTPs
import dotenv from "dotenv";

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOtpToUser = async (userId, mobile) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP to database with user ID and expiration time
  await OtpModel.create({
    userId: userId,
    code: otpCode,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
  });

  // Send OTP via Twilio
  await twilioClient.messages.create({
    body: `Your OTP is: ${otpCode}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: mobile,
  });
};

export const verifyUserOtp = async (userId, otpCode) => {
  const otpRecord = await OtpModel.findOne({ userId, code: otpCode });

  if (!otpRecord || otpRecord.expiresAt < Date.now()) {
    return false; // OTP is invalid or expired
  }

  // OTP is valid, delete it after verification
  await OtpModel.deleteOne({ userId, code: otpCode });
  return true;
};
