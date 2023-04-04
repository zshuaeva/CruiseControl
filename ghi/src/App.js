import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DummyList from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import TechnicianForm from "./Technician/TechnicianForm.js";
import ClientSignUpForm from "./ClientSignUp.js";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./ClientLogin.js";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route path="technician">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="clientsignup" element={<ClientSignUpForm />} />
          <Route path="Login" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
