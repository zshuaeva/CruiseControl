import React, { useState } from "react";

function TechnicianForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = username;
    data.password = password;
    data.businessName = businessName;
    const url = "http://localhost:8000/api/technician";
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
      setUsername("");
      setPassword("");
      setBusinessName("");
    } else {
      console.error("Error creating Client; Please try again");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="shadow p-4 mt-4">
            <h1>Sign Up As Technician</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
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
      </div>
    </div>
  );
}

export default TechnicianForm;
