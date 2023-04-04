import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DummyList from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import TechnicianForm from "./Technician/TechnicianForm.js";
import ClientSignUpForm from "./ClientSignUp.js";
import HeroPage from "./HeroPage.js";
import ClientLanding from "./ClientLanding.js";
import TechnicianLanding from "./TechnicianLanding.js";
import Nav from "./Nav.js";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
    <BrowserRouter>
    <Nav />
      <div>
        <Routes>
          <Route path="" element={<HeroPage /> } />
        </Routes>
        <Routes>
          <Route path="clientlanding" element={<ClientLanding /> } />
        </Routes>

        <Routes>
          <Route path="technician">
            <Route path="new" element={<TechnicianForm />} />
            <Route path="landing" element={< TechnicianLanding />} />
          </Route>
          {/* <ErrorNotification />
          <DummyList /> */}
        </Routes>

      <Routes>
        <Route path="clientsignup" element={<ClientSignUpForm />} />
      </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
