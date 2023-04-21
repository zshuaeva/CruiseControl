import React, { useState } from "react";

function TechnicianForm({ getTechnician, token, user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [business_id, setBusinessId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = username;
    data.password = password;
    data.business_id = user.business_id;
    data.employee_id = employee_id;
    data.first_name = first_name;
    data.last_name = last_name;
    data.email = email;
    data.address = address;
    data.phone_number = phone_number;
    const url = "http://localhost:8000/api/technician";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      setUsername("");
      setPassword("");
      setBusinessId("");
      setEmployeeId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setAddress("");
      setPhoneNumber("");
      getTechnician();
    } else {
      console.error("Error creating Technician; Please try again");
    }
  };
  return (
    <div>
      {token && user?.is_client === true ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className=" bg-dark text-white p-4 mt-4">
                <h1>Sign Up As Technician</h1>
                <form onSubmit={handleSubmit} className="row g-10">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      required
                      placeholder="Username"
                    />
                    <label htmlFor="username"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <label htmlFor="password"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="First Name"
                      value={first_name}
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                    />
                    <label htmlFor="first_name"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Last Name"
                      value={last_name}
                      onChange={(event) => setLastName(event.target.value)}
                      required
                    />
                    <label htmlFor="last_name"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      id="employee_id"
                      placeholder="Employee Id"
                      value={employee_id}
                      onChange={(event) => setEmployeeId(event.target.value)}
                      required
                    />
                    <label htmlFor="Employee_id"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                    <label htmlFor="email"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      required
                    />
                    <label htmlFor="address"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control"
                      id="phone_number"
                      placeholder="Phone Number"
                      value={phone_number}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      required
                    />
                    <label htmlFor="phone_number"></label>
                  </div>
                  <button
                    className="btn text-primary btn-sm rounded-0 fw-bold fs-3"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="This will Create a technician"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {token && user?.is_technician ? (
        <div className="alert alert-danger" role="alert">
          This area is off limits.
        </div>
      ) : null}
    </div>
  );
}

export default TechnicianForm;
