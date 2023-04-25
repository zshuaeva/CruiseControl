import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";

function ClientSignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
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
      <div className="container d-flex justify-content-center mt-5" style={{ marginTop: "5rem" }}>
        <div className="shadow p-4" style={{ width: "30rem", backgroundColor: "#f8f9fa" }}>
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
              />
              <label htmlFor="businessName">Business Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientSignUpForm;
