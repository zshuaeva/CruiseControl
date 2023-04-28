import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";

function ClientSignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { login } = useToken();
  const { token } = useContext(AuthContext);
  const user = useUser(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.username = username;
    data.password = password;
    data.business_name = businessName;
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/clientsignup`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      try {
        await login(username, password);
        setUsername("");
        setPassword("");
        setBusinessName("");
        navigate("/clientlanding");
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      console.error("Error creating Client; Please try again");
    }
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center mt-5"
        style={{ marginTop: "5rem" }}
      >
        <div
          className="shadow p-4"
          style={{ width: "30rem", backgroundColor: "#f8f9fa" }}
        >
          <h1>Sign Up For Cruise Control</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                placeholder="username"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="first_name"
                placeholder="First Name"
                value={first_name}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Last Name"
                value={last_name}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="businessName"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="businessName"
                required
              />
              <label htmlFor="businessName">Business Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="employee_id"
                placeholder="Employee Id"
                value={employee_id}
                onChange={(event) => setEmployeeId(event.target.value)}
                required
              />
              <label htmlFor="Employee_id">Employee Id</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control"
                id="phone_number"
                placeholder="Phone Number"
                value={phone_number}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientSignUpForm;
