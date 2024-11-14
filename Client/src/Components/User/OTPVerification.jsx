import React, { useState } from 'react';
import firebase from '../../firebase';
import axios from 'axios';

const OTPVerification = ({ onVerified, phoneNumber }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Request OTP from Firebase
  const sendOTP = async () => {
    setIsLoading(true);
    const appVerifier = window.recaptchaVerifier; // Firebase reCAPTCHA
    try {
      const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      alert("OTP Sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP submission
  const verifyOTP = async () => {
    try {
      const user = await confirmationResult.confirm(verificationCode);
      if (user) {
        // OTP is verified successfully, now trigger blockchain
        onVerified();  // Call the parent component's callback to continue the voting process
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP!');
    }
  };

  return (
    <div>
      <h3>OTP Verification</h3>
      <div>
        <button onClick={sendOTP} disabled={isLoading}>Send OTP</button>
      </div>
      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={verifyOTP} disabled={isLoading}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default OTPVerification;
