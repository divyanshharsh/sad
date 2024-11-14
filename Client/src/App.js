// src/App.js
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PageNotFound from "./Pages/admin/PageNotFound";
// import { adminRoutes } from "./Routes/AdminRoutes";
// import { userRoutes } from "./Routes/UserRoutes";
// import { TransactionProvider } from "./context/TransactionContext";

// // Corrected import paths using relative paths
// import EmailOTP from "./Components/EmailOTP.jsx";
// import VerifyEmailOTP from "./Components/VerifyEmailOTP.jsx";

// function App() {
//   return (
//     <div className="App">
//       <TransactionProvider>
//         <BrowserRouter>
//           <Routes>
//             {userRoutes}
//             {adminRoutes}
//             <Route path="/email" element={<EmailOTP />} />
//             <Route path="/verify-email" element={<VerifyEmailOTP />} />
//             <Route path="*" element={<PageNotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TransactionProvider>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./Pages/admin/PageNotFound";
import { adminRoutes } from "./Routes/AdminRoutes";
import { userRoutes } from "./Routes/UserRoutes";
import { TransactionProvider } from "./context/TransactionContext";

// Corrected import paths
import EmailOTP from "./Components/EmailOTP";
import VerifyEmailOTP from "./Components/VerifyEmailOTP";

function App() {
  return (
    <div className="App">
      <TransactionProvider>
        <BrowserRouter>
          <Routes>
            {/* Render user-defined routes */}
            {userRoutes.map((route, index) => (
              React.cloneElement(route, { key: `user-${index}` })
            ))}
            
            {/* Render admin-defined routes */}
            {adminRoutes.map((route, index) => (
              React.cloneElement(route, { key: `admin-${index}` })
            ))}

            {/* Additional OTP and Verification routes */}
            <Route path="/email" element={<EmailOTP />} />
            <Route path="/verify-email" element={<VerifyEmailOTP />} />
            
            {/* Catch-all for undefined routes */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </TransactionProvider>
    </div>
  );
}

export default App;
