import React, { useState } from "react";
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { auth } from "Client\src\firebase.js"; // Import your Firebase config

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  // Initialize Firebase Auth without Recaptcha
  const requestOtp = async () => {
    // Disable app verification for testing purposes
    const appVerifier = new PhoneAuthProvider(auth);

    // Bypass reCAPTCHA (for testing purposes only!)
    appVerifier.setAppVerificationDisabledForTesting(true);

    try {
      const verification = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(verification.verificationId);
      alert("OTP sent to your phone");
    } catch (error) {
      console.error("Error during OTP request:", error);
      alert("Error during OTP request.");
    }
  };

  const verifyOtp = async () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      await auth.signInWithCredential(credential);
      alert("Phone verified successfully");
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("Failed to verify OTP, please try again.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={requestOtp}>Request OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
};

export default PhoneAuth;
