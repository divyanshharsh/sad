// firebase.js

import { initializeApp } from "firebase/app";

import { getAuth, RecaptchaVerifier } from "firebase/auth";
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_b8IKpWh5zdbFMgnGIjo4YM-bUqyeQQU",
  authDomain: "voting-otp-81b76.firebaseapp.com",
  projectId: "voting-otp-81b76",
  storageBucket: "voting-otp-81b76.firebasestorage.app",
  messagingSenderId: "891062293219",
  appId: "1:891062293219:web:cb6dc6b3420ca69b39ebd6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize the reCAPTCHA verifier (invisible)
const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
  size: "invisible", // Invisible reCAPTCHA
  callback: (response) => {
    console.log("Recaptcha verified:", response);
  },
  "expired-callback": () => {
    console.log("reCAPTCHA expired.");
  },
}, auth);

export { app, auth, recaptchaVerifier }; // Exporting required modules

