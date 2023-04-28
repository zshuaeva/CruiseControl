import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import useUser from "./useUser";
import CalendarComponent from "./CalendarComponent";
import AppointmentPendingList from "./AppointmentsPendingList";
import AppointmentApprovedList from "./AppointmentApprovedList";
import ServiceParent from "./ServiceParent";
import TechnicianParent from "./TechParent";


function ClientLanding() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  // const [showPending, setShowPending] = useState(true);
  const [activeComponent, setActiveComponent] = useState("pending")
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [approvedAppoinemnts, setApprovedAppointments] = useState([]);

  const getAppointments = async () => {
    const listUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments`;
    const response = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      const approvedAppoinemnts = data.filter(
        (appointment) => appointment.is_approved
      );
      setApprovedAppointments(approvedAppoinemnts);
      const pendingAppointments = data.filter(
        (appointment) => !appointment.is_approved
      );
      setPendingAppointments(pendingAppointments);
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  const handlePendingClick = () => {
    setActiveComponent("pending");
  };

  const handleApprovedClick = () => {
    setActiveComponent("approved");
  };

  const handleServicesClick = () => {
    setActiveComponent("services");
  };

  const handleTechniciansClick = () => {
    setActiveComponent("technicians");
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "pending":
        return <AppointmentPendingList user={user} getAppointments={getAppointments} appointments={pendingAppointments} token={token} />;
      case "approved":
        return <AppointmentApprovedList user={user} getAppointments={getAppointments} appointments={approvedAppoinemnts} token={token} />;
      case "services":
        return <ServiceParent user={user} token={token} />;
      case "technicians":
        return <TechnicianParent user={user} token={token} />;
      default:
        return null;
    }
  };
  return (
    <>
      {token && user?.is_client && (
        <div className="">
          <div className="container">
            <div className="row align-items-start">
              <h1 className="text-left text-capitalize text-black col">
                {user.username}'s Dashboard
              </h1>
              <div className="col">
                <CalendarComponent appointments={approvedAppoinemnts} token={token} />
              </div>
            </div>
          </div>
          <div className="row p-1">
            <div className="row mb-1">
              <div className="col">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "pending" ? "active" : ""}`}
                      onClick={handlePendingClick}
                    >
                      Upcoming Appointments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "approved" ? "active" : ""}`}
                      onClick={handleApprovedClick}
                    >
                      Approved Appointments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "services" ? "active" : ""}`}
                      onClick={handleServicesClick}
                    >
                      Services
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "technicians" ? "active" : ""}`}
                      onClick={handleTechniciansClick}
                    >
                      Technicians
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col mb-4">
              {renderActiveComponent()}
            </div>

          </div>
        </div>
        // </div >
      )
      }
      {
        !token ||
        (token && user?.is_technician && (
          <div className="alert alert-danger" role="alert">
            This area is off limits.
          </div>
        ))
      }
    </>
  );
}

export default ClientLanding;
