import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DummyList from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import TechnicianForm from "./Technician/TechnicianForm.js";
import ClientSignUpForm from "./ClientSignUp.js";
import HeroPage from "./HeroPage.js";
import ClientLanding from "./ClientLanding.js";

function App() {
  return (
    <BrowserRouter>
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
          </Route>
          {/* <ErrorNotification />
          <DummyList /> */}
        </Routes>
      </div>
      <Routes>
        <Route path="clientsignup" element={<ClientSignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
