import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Cruise Control HERO/HOME
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/clientsignup">
                Sign Up as CLIENT
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/Login">
                Sign In
              </NavLink>
            </li>

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
              <NavLink className="nav-link" to="/technician/landing">
                TECHNICIAN Landing
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
