import React, { useState } from "react";
import { auth, sendSignInLinkToEmail } from "../firebaseConfig.js";
import { Button, TextField, Alert } from "@mui/material";

const EmailOTP = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOTP = async () => {
    setError(""); // Reset errors
    setMessage(""); // Reset message

    // Validate email
    if (!email) {
      setError("Please enter an email.");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/verify-email", // Replace with your verification route
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("OTP has been sent to your email. Please check your inbox.");
    } catch (error) {
      console.error("Error sending OTP:", error); // Log detailed error
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div>
      <TextField
        label="Enter your email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
      <Button onClick={handleSendOTP} variant="contained" color="primary">
        Send OTP
      </Button>
    </div>
  );
};

export default EmailOTP;
