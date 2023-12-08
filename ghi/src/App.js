import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientSignUpForm from './Clientele/ClientSignUp.js';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import LoginForm from './Login.js';
import HeroPage from './HeroPage.js';
import ClientLanding from './Clientele/ClientLanding.js';
import TechnicianLanding from './Technician/TechnicianLanding.js';
import Nav from './Nav.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TechnicianParent from './Technician/TechParent.js';
import ServiceParent from './ServiceComponents/ServiceParent.js';
import ServiceChecklist from './ServiceComponents/ServiceChecklist.js';

import AppointmentList from './Appointments/AppointmentList.js';
import AppointmentCreation from './Appointments/AppointmentCreation.js';
import AppointmentPendingList from './Appointments/AppointmentsPendingList.js';
import AppointmentApprovedList from './Appointments/AppointmentApprovedList.js';
import AppointmentDetail from './Appointments/AppointmentDetail.js';
import AppointmentEdit from './Appointments/AppointmentUpdate.js';
import Footer from './Footer.js';

import HeroAppointmentForm from './HeroAppointmentForm.js';
import AboutUs from './AboutUs.js';

function App() {
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const mainContentStyle = {
    flexGrow: 1,
  };

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider
        tokenUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`}
      >
        <div style={appStyle}>
          <Nav />
          <div className="container-fluid" style={mainContentStyle}>
            <div className="mt-5 pt-5">
              <Routes>
                <Route path="/" element={<HeroPage />} />

                <Route path="clientlanding" element={<ClientLanding />} />

                <Route path="technicians" element={<TechnicianParent />} />

                <Route
                  path="technicianlanding"
                  element={<TechnicianLanding />}
                />

                <Route path="appointment">
                  <Route path="all" element={<AppointmentList />} />
                  <Route path="pending" element={<AppointmentPendingList />} />
                  <Route
                    path="approved"
                    element={<AppointmentApprovedList />}
                  />
                  <Route
                    path=":appointmentId"
                    element={<AppointmentDetail />}
                  />
                  <Route
                    path=":appointmentId/edit"
                    element={<AppointmentEdit />}
                  />
                </Route>

                <Route path="services">
                  <Route path="" element={<ServiceParent />} />
                  <Route
                    path=":serviceId/checklist"
                    element={<ServiceChecklist />}
                  />
                </Route>

                <Route
                  path="customerAppointmentCreation"
                  element={<AppointmentCreation />}
                />

                <Route
                  path="newappoitnment"
                  element={<HeroAppointmentForm />}
                />
                <Route path="clientsignup" element={<ClientSignUpForm />} />
                <Route path="Login" element={<LoginForm />} />
                <Route path="aboutus" element={<AboutUs />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
