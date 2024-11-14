import { Button, Typography, TextField, Paper, Box } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firecon"; // Ensure this points to the correct config file
import { TransactionContext } from "../context/TransactionContext";

const OtpVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { sendTransaction } = useContext(TransactionContext);

  const electionId = location.state?.electionId;
  const candidateId = location.state?.candidateId;

  // Initialize Recaptcha and Firebase
  useEffect(() => {
    setLoading(true);
    if (auth && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("Recaptcha verified successfully.");
            },
            defaultCountry: "IN",
          },
          auth
        );
        console.log("Recaptcha initialized successfully.");
      } catch (err) {
        console.error("Error initializing Recaptcha:", err);
        setError("Failed to initialize Recaptcha. Please try again later.");
      }
    }
    setLoading(false);
  }, [auth]);

  const sendOtp = async () => {
    setError("");
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setOtpSent(true);
      alert("OTP sent to your phone number.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please check the phone number and try again.");
    }
  };

  const verifyOtp = async () => {
    setError("");
    if (verificationId && otp) {
      try {
        const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
        await auth.signInWithCredential(credential);
        alert("OTP verified successfully.");
        triggerMetaMask();
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setError("Invalid OTP. Please try again.");
      }
    } else {
      setError("Please enter the OTP sent to your phone number.");
    }
  };

  const triggerMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        console.log("Connected to MetaMask:", account);

        const transaction = await sendTransaction(electionId, candidateId, phoneNumber);
        if (transaction.valid) {
          alert("Your vote has been successfully cast!");
          navigate("/");
        } else {
          alert("Voting failed: " + transaction.message);
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        setError("MetaMask connection failed. Please try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  return (
    <Paper elevation={3}>
      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        <Box px={3} py={2}>
          <Typography variant="h6" align="center">
            Phone Number OTP Verification
          </Typography>

          <TextField
            label="Phone Number (e.g., +911234567890)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            disabled={otpSent}
          />

          {otpSent && (
            <TextField
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
            />
          )}

          {error && <Typography color="error">{error}</Typography>}

          <Box mt={3}>
            {!otpSent ? (
              <Button variant="contained" color="primary" onClick={sendOtp}>
                Send OTP
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={verifyOtp}>
                Verify OTP and Vote
              </Button>
            )}
          </Box>
          <div id="recaptcha-container"></div>
        </Box>
      )}
    </Paper>
  );
};

export default OtpVerification;
