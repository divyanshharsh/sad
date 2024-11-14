import { sendOtpToUser, verifyUserOtp } from "../services/otpService.js"; // Utility functions for OTP

// Method to send OTP to the user
export const otp = {
  send: async (req, res) => {
    const { user_id } = req.body;
    try {
      await sendOtpToUser(user_id); // Sends OTP and stores it in the database
      res.status(200).send({ message: "OTP sent successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error sending OTP", error });
    }
  },

  verify: async (req, res) => {
    const { user_id, otp } = req.body;
    try {
      const isValid = await verifyUserOtp(user_id, otp); // Verifies OTP from the database
      if (isValid) {
        res.status(200).send({ message: "OTP verified successfully" });
      } else {
        res.status(400).send({ message: "Invalid or expired OTP" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error verifying OTP", error });
    }
  },
};
