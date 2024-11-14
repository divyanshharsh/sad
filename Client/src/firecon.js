import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDDV3E2msVO7IYFAxtDYIVYNJRaPWlqXxU",
    authDomain: "sadproject-2afe6.firebaseapp.com",
    projectId: "sadproject-2afe6",
    storageBucket: "sadproject-2afe6.firebasestorage.app",
    messagingSenderId: "254496153241",
    appId: "1:254496153241:web:6e62094bebb52c98b56208"
  };
  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth };