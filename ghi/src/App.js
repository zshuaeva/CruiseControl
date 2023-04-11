import { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DummyList from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import TechnicianForm from "./Technician/TechnicianForm.js";
import ClientSignUpForm from "./ClientSignUp.js";
import { AuthContext, AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./Login.js";
import HeroPage from "./HeroPage.js";
import ClientLanding from "./ClientLanding.js";
import TechnicianLanding from "./TechnicianLanding.js";
import Nav from "./Nav.js";
import "bootstrap/dist/css/bootstrap.css";
import ChecklistForm from "./ChecklistForm.js";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider
        tokenUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`}
      >
        <Nav />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="clientlanding" element={<ClientLanding />} />
          <Route path="technician">
            <Route path="new" element={<TechnicianForm />} />
            <Route path="landing" element={<TechnicianLanding />} />
          </Route>
          <Route path="clientsignup" element={<ClientSignUpForm />} />
          <Route path="Login" element={<LoginForm />} />
          <Route path="checklist/new" element={<ChecklistForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
