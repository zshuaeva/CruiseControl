import { NavLink } from "react-router-dom";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";
import "./Nav.css";

function Nav() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const { logout } = useToken();
  return (
    <nav id="nav" className="navbar fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-light fw-bold fs-4" to="/">
          Cruise Control
        </NavLink>
        <button
          className="navbar-toggler bg-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div id="offheader" className="offcanvas-header text-capitalize">
            {token && user ? (
              <h1 className="offcanvas-title">Welcome {user.username}</h1>
            ) : null}
            {user === null || token === null ? (
              <h1 className="offcanvas-title">Welcome</h1>
            ) : null}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div id="offcanvas" className="offcanvas-body bg-secondary">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {token && user?.is_client === true ? (
                <>
                  <li className="nav-item p-2">
                    <NavLink
                      className="nav-link fw-bold fs-5"
                      to="/clientlanding"
                    >
                      CLIENT Landing
                    </NavLink>
                  </li>
                  <hr className="nav-divider" />
                  <li className="nav-item p-2">
                    <NavLink className="nav-link fw-bold fs-5" to="/technician">
                      TECHNICIAN
                    </NavLink>
                  </li>
                  <hr className="nav-divider" />
                  <li className="nav-item p-2">
                    <NavLink className="nav-link fw-bold fs-5" to="/service">
                      Service
                    </NavLink>
                  </li>
                  <hr className="nav-divider" />
                  <li className="nav-item p-2">
                    <NavLink
                      className="nav-link fw-bold fs-5"
                      to="/customerAppointmentCreation"
                    >
                      Customer Appointment Creation
                    </NavLink>
                  </li>
                  <hr className="nav-divider" />
                  <li className="nav-item p-2">
                    <NavLink
                      className="nav-link fw-bold fs-5"
                      to="/appointment/all"
                    >
                      All Appointments
                    </NavLink>
                  </li>
                  <hr className="nav-divider" />
                  <li className="nav-item p-2">
                    <NavLink
                      className="nav-link fw-bold fs-5"
                      to="/appointment/approved"
                    >
                      Approved Appointments
                    </NavLink>
                  </li>
                  <hr className="nav-divider" />
                  <li className="nav-item p-2">
                    <NavLink
                      className="nav-link fw-bold fs-5"
                      to="/appointment/pending"
                    >
                      Upcoming Appointments
                    </NavLink>
                  </li>
                  <hr className="nav-divider" />
                  <li className="nav-item">
                    <NavLink>
                      <button
                        className="btn btn-lg text-light rounded-0 fw-bolder"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </NavLink>
                  </li>
                </>
              ) : null}
              {token && user?.is_technician ? (
                <>
                  <li className="nav-item p-2">
                    <NavLink
                      className="nav-link fw-bold fs-5"
                      to="/technician/landing"
                    >
                      TECHNICIAN Landing
                    </NavLink>
                  </li>
                  <hr className="nav-divider" />
                  <li className="nav-item p-2">
                    <NavLink>
                      <button
                        className="btn btn-lg text-light rounded-0 fw-bolder"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </NavLink>
                  </li>
                </>
              ) : null}
              {user === null || token === null ? (
                <>
                  <li className="nav-item p-2">
                    <NavLink
                      className="nav-link text-light fw-bold fs-5"
                      to="/clientsignup"
                    >
                      Client Sign Up
                    </NavLink>
                  </li>
                  <hr className="nav-divider" />
                  <li className="nav-item">
                    <NavLink to="/Login">
                      <button className="btn btn-lg text-light rounded-400 fw-bolder">
                        Login
                      </button>
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
