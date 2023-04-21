import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignUpForm from "./ClientSignUp.js";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./Login.js";
import HeroPage from "./HeroPage.js";
import ClientLanding from "./ClientLanding.js";
import TechnicianLanding from "./TechnicianLanding.js";
import Nav from "./Nav.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import TechnicianParent from "./TechnicianParent.js";
import ServiceParent from "./ServiceParent.js";

import AppointmentList from "./AppointmentList.js";
import AppointmentCreation from "./AppointmentCreation.js";
import AppointmentPendingList from "./AppointmentsPendingList.js";
import AppointmentApprovedList from "./AppointmentApprovedList.js";
import AppointmentDetail from "./AppointmentDetail.js";

import AppointmentEdit from "./AppointmentUpdate.js";

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

          <Route path="technician" element={<TechnicianParent />}/>
          <Route path="technician">
            <Route path="landing" element={<TechnicianLanding />} />
          </Route>

          <Route path="appointment">
            <Route path="all" element={<AppointmentList />} />
            <Route path="pending" element={<AppointmentPendingList />} />
            <Route path="approved" element={<AppointmentApprovedList />} />
            <Route path=":appointmentId" element={<AppointmentDetail />} />
            <Route path=":appointmentId/edit" element={<AppointmentEdit />} />
          </Route>

          <Route path="service" element={<ServiceParent />} />
          {/* <Route path="new" element={<ServiceCreation />} />
            <Route path="all" element={<ServiceList />} /> */}
          {/* </Route> */}

          <Route
            path="customerAppointmentCreation"
            element={<AppointmentCreation />}
          />

          <Route path="clientsignup" element={<ClientSignUpForm />} />
          <Route path="Login" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
