import { NavLink } from "react-router-dom";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";
import "./Nav.css";

function Nav() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const { logout } = useToken();

  const closeOffcanvas = () => {
    document.getElementById("offcanvasNavbar").classList.remove("show");
  };

  return (
    <nav id="nav" className="navbar fixed-top">
      <div className="container-fluid">
        {user?.is_client ? (
          <NavLink
            className="navbar-brand text-light fw-bold fs-4"
            to="/clientlanding"
          >
            Cruise Control
          </NavLink>
        ) : user?.is_technician ? (
          <NavLink
            className="navbar-brand text-light fw-bold fs-4"
            to="/technician/landing"
          >
            Cruise Control
          </NavLink>
        ) : (
          <NavLink
            className="navbar-brand text-light fw-bold fs-4"
            to="/"
          >
            Cruise Control
          </NavLink>
        )}
        <button
          className="navbar-toggler bg-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && user?.is_client === true ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/clientlanding">
                    CLIENT Landing
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/technician/new">
                    Create new TECHNICIAN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/checklist">
                    Checklist Parent
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/checklist/all">
                    All Checklist
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/checklist/form">
                    Checklist Form
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/technician/landing">
                    TECHNICIAN Landing
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/service">
                    Service
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/customerAppointmentCreation">
                    Customer Appointment Creation
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/appointment/all">
                    All appointments
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/appointment/approved">
                    Approved Appointments
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/appointment/pending">
                    Upcoming Appointments
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    <button className="btn btn-warning" onClick={logout}>
                      Logout
                    </button>
                  </NavLink>
                </li>
              </>
            ) : null}
            {token && user?.is_technician ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/technician/landing">
                    TECHNICIAN Landing
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    <button className="btn btn-warning" onClick={logout}>
                      Logout
                    </button>
                  </NavLink>
                </li>
              </>
            ) : null}
            {user === null || token === null ? (
              <>
                <li>
                  <NavLink to="/Login">
                    <button className="btn btn-warning">Login</button>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/clientsignup">
                    Client Sign Up
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
