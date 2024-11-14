import React, { useState, useEffect } from "react";
import { auth, isSignInWithEmailLink, signInWithEmailLink } from "../firebaseConfig.js";
import { Alert } from "@mui/material";

const VerifyEmailOTP = () => {
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const email = window.localStorage.getItem("emailForSignIn");
    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          setIsVerified(true);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, []);

  return (
    <div>
      {isVerified ? (
        <Alert severity="success">Email verified successfully!</Alert>
      ) : (
        <Alert severity="error">{error}</Alert>
      )}
    </div>
  );
};

export default VerifyEmailOTP;
