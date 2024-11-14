import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth';

export default function OTPModal({ open, onClose, onSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handlePhoneSubmit = () => {
    const auth = getAuth();

    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('Recaptcha verified!');
      },
    }, auth);

    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
      })
      .catch((error) => {
        console.log("Error during phone number sign-in: ", error);
      });
  };

  const handleOtpSubmit = () => {
    const auth = getAuth();

    const credential = PhoneAuthProvider.credential(
      verificationId,
      otp
    );

    auth.signInWithCredential(credential)
      .then((userCredential) => {
        // OTP verification successful
        onSubmit(userCredential);
      })
      .catch((error) => {
        console.log("OTP verification failed: ", error);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <Typography variant="h6">Enter your phone number</Typography>
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button onClick={handlePhoneSubmit}>Send OTP</Button>

        {verificationId && (
          <>
            <Typography variant="h6">Enter OTP</Typography>
            <TextField
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button onClick={handleOtpSubmit}>Verify OTP</Button>
          </>
        )}

        <div id="recaptcha-container"></div>
      </Box>
    </Modal>
  );
}
