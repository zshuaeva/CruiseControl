import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";

function ClientLanding() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);

  return (
    <>
      {token && user?.is_client && (
        <div className="container mt-5">
          <h1 className="text-center text-capitalize text-white p-4 mb-4">
            {user.username}'s Dashboard
          </h1>
          <div className="row p-2 justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="bg-secondary text-white card h-100 mb-4">
                <div className="card-body text-center">
                  <h5 className="card-title text-center fw-bold fs-5">
                    Upcoming Appointments
                  </h5>
                  <div className="position-absolute bottom-0 start-0 end-0">
                  <Link
                    to="/appointment/pending"
                    className="btn text-info btn-sm rounded-0 p-0 fw-bold fs-3"
                  >
                    View
                  </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card h-100 mb-4">
                <div className="card-body d-flex flex-column align-items-center">
                  <h5 className="card-title text-center fw-bold fs-5">
                    Approved Appointments
                  </h5>
                  <Link
                    to="/appointment/approved"
                    className="btn btn-primary mt-auto w-100"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card h-100 mb-4">
                <div className="card-body d-flex flex-column align-items-center">
                  <h5 className="card-title text-center fw-bold fs-5">Services</h5>
                  <Link to="/service" className="btn btn-primary mt-auto w-100">
                    View
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card h-100 mb-4">
                <div className="card-body d-flex flex-column align-items-center">
                  <h5 className="card-title text-center fw-bold fs-5">Technicians</h5>
                  <Link
                    to="/technician/"
                    className="btn btn-primary mt-auto w-100"
                  >
                    View
                  </Link>
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
