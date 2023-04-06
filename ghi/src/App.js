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
import Logout from "./Logout.js";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const { token } = useContext(AuthContext);
  console.log(token);
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="clientlanding" element={<ClientLanding />} />
        <Route path="technician">
          <Route path="new" element={<TechnicianForm token={token} />} />
          <Route path="landing" element={<TechnicianLanding />} />
        </Route>
        <Route path="clientsignup" element={<ClientSignUpForm />} />
        <Route path="Login" element={<LoginForm />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
