// THIS VERSION DOES NOT CONTAIN A RUNNING LIST
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function ChecklistForm({ getChecklists, user }) {
  const { token } = useContext(AuthContext);
  const [checklist_item, setChecklistItem] = useState("");
  const [service, setService] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    async function fetchServices() {
      const serviceUrl = "http://localhost:8000/api/services";
      const fetchConfig = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(serviceUrl, fetchConfig);
      if (response.ok) {
        const serviceData = await response.json();
        setService(serviceData);
      } else {
        console.error("Error fetching from service");
      }
    }
    fetchServices();
  }, [token]);

  const handleDrop = (event) => {
    const selectedService = service.find(
      (service) => service.id === parseInt(event.target.value)
    );
    setServiceId(event.target.value);
    setServiceName(selectedService ? selectedService.service_name : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.checklist_item = checklist_item;
    data.service_id = serviceId;

    const url = "http://localhost:8000/api/checklist";
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
      setChecklistItem("");
      setServiceName("");
      setServiceId(serviceId);
    } else {
      console.error("Error creating checklist, please check input");
    }
  };


  return (
    <>
      <div className="form-floating mb-3">
        <select
          onChange={handleDrop}
          value={serviceId}
          id="serviceId"
          className="form-select"
        >
          <option value="">Select a Service</option>
          {service.map((service) => {
            return (
              <option key={service.id} value={service.id}>
                {service.service_name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="container-fluid d-flex justify-content-center">
        <div className="shadow p-4 mt-4">
          <h1>Create Checklist for (placeholder checklistname)</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={checklist_item}
                onChange={(event) =>
                  setChecklistItem(event.target.value)
                }
                placeholder="Enter Step Details"
              />
              <label htmlFor="Enter Step">Enter Step Detail</label>
            </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChecklistForm;
