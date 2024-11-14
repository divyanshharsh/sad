import React, { useContext, useState } from "react";
import { Button, Typography, Box, TextField, Paper, Grid } from "@mui/material";
import { TransactionContext } from "../context/TransactionContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverLink } from "../Data/Variables";

const OtpVerification = () => {
  const { connectWallet } = useContext(TransactionContext);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  const firebaseOtpVerify = async (otp) => {
    try {
      const response = await axios.post(`${serverLink}verifyOtp`, { otp });
      return response.status === 200;
    } catch (error) {
      console.error("Error during OTP verification:", error);
      return false;
    }
  };

  const handleOtpSubmit = async () => {
    const isVerified = await firebaseOtpVerify(otp);

    if (isVerified) {
      setIsOtpVerified(true);
      await connectWallet(); // Trigger MetaMask after OTP verification
      navigate("/"); // Redirect to home page or desired page
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h6" align="center" gutterBottom>
        OTP Verification
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Enter OTP"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={!!otpError}
            helperText={otpError}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOtpSubmit}
          >
            Verify OTP and Connect Wallet
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OtpVerification;
