import React, { useState } from "react";

function ClientEdit(props) {
  const [id] = useState(props.client.id);
  const [username, setUsername] = useState(props.client.username);
  const [password, setPassword] = useState(props.client.password);
  const [business_id] = useState(props.client.business_id);
  const [employee_id, setEmployeeId] = useState(props.client.employee_id);
  const [first_name, setFirstName] = useState(props.client.first_name);
  const [last_name, setLastName] = useState(props.client.last_name);
  const [email, setEmail] = useState(props.client.email);
  const [phone_number, setPhoneNumber] = useState(props.client.phone_number);
  const [address, setAddress] = useState(props.client.address);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      id: props.client.id,
      username,
      password,
      business_id: props.client.business_id,
      employee_id: props.client.employee_id,
      first_name,
      last_name,
      email,
      phone_number,
      address,
    };

    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${props.client.id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const updatedClient = await response.json();
      props.handleClientEdit(updatedClient);
    } else {
      console.error("Server error:", await response.text());
    }
  };



  return (
    <div>
      {props.token && props.user?.is_client === true ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className=" bg-dark text-white p-4 mt-4">
                <h1>Update Your Account</h1>
                <form onSubmit={handleSubmit} className="row g-10">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="First Name"
                      value={first_name}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label htmlFor="first name" />
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                      <label htmlFor="Last Name"></label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        id="employee_id"
                        placeholder="Employee Id"
                        value={employee_id}
                        onChange={(event) => setEmployeeId(event.target.value)}
                      />
                      <label htmlFor="Employee_id"></label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        <label htmlFor="email"></label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                      />
                      <label htmlFor="email"></label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="tel"
                        className="form-control"
                        id="phone_number"
                        placeholder="Phone Number"
                        value={phone_number}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                      />
                      <label htmlFor="phone_number"></label>
                    </div>
                    <button
                      className="btn btn-lg text-primary btn-sm rounded-0 fw-bold fs-3"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="This will Submit your changes"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {props.token && props.user?.is_technician ? (
        <div class="alert alert-danger" role="alert">
          This area is off limits.
        </div>
      ) : null}
    </div>
  );
}


export default ClientEdit;
