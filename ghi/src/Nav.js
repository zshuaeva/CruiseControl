import { NavLink } from "react-router-dom";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";

function Nav() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const { logout } = useToken();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Cruise Control
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
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
                  <NavLink
                    className="nav-link"
                    to="/customerAppointmentCreation"
                  >
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
