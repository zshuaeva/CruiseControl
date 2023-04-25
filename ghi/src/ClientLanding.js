import React, { useContext, useState } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import CalendarComponent from "./CalendarComponent";

import AppointmentPendingList from "./AppointmentsPendingList";

import AppointmentApprovedList from "./AppointmentApprovedList";

import { Link } from "react-router-dom";

function ClientLanding() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [showPending, setShowPending] = useState(true);

  const handlePendingClick = () => {
    setShowPending(true);
  };

  const handleApprovedClick = () => {
    setShowPending(false);
  };

  return (
    <>
      {token && user?.is_client && (
        <div className="">
          <h1 className="text-center text-capitalize text-black p-4 mb-4">
            {user.username}'s Dashboard
          </h1>
          <div className="row p-2">
            <div className="col-lg-8 mb-4">
              <CalendarComponent />
              {showPending ? (
                <AppointmentPendingList />
              ) : (
                <AppointmentApprovedList />
              )}
            </div>
            <div className="col-lg-4">
              <div className="row mb-4">
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title text-center fw-bold fs-5">
                        Upcoming Appointments
                      </h5>
                      <button
                        onClick={handlePendingClick}
                        className={`btn btn-primary mt-3 mb-2 w-100 ${
                          showPending ? "active" : ""
                        }`}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title text-center fw-bold fs-5">
                        Approved Appointments
                      </h5>
                      <button
                        onClick={handleApprovedClick}
                        className={`btn btn-primary mt-3 mb-2 w-100 ${
                          !showPending ? "active" : ""
                        }`}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title text-center fw-bold fs-5">
                        Services
                      </h5>
                      <Link
                        to="/services"
                        className="btn btn-primary mt-3 mb-2 w-100"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title text-center fw-bold fs-5">
                        Technicians
                      </h5>
                      <Link
                        to="/technicians"
                        className="btn btn-primary mt-3 mb-2 w-100"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!token ||
        (token && user?.is_technician && (
          <div className="alert alert-danger" role="alert">
            This area is off limits.
          </div>
        ))}
    </>
  );
}

export default ClientLanding;
