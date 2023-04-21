import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function ChecklistForm({ getChecklists, user }) {
  const { token } = useContext(AuthContext);
  const [checklist_item, setChecklistItem] = useState("");
  const [service, setService] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [checklists, setChecklists] = useState([]);

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
        console.error("Error fetching services");
      }
    }
    fetchServices();
  }, [token]);

  useEffect(() => {
    async function fetchChecklists() {
      const checklistUrl = "http://localhost:8000/api/checklist";
      const fetchConfig = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(checklistUrl, fetchConfig);
      if (response.ok) {
        const checklistData = await response.json();
        setChecklists(checklistData);
      } else {
        console.error("Error fetching checklists");
      }
    }
    fetchChecklists();
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
    data.service_name = serviceName;

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
      const newItem = await response.json();
      setChecklist([...checklist, newItem]);
      setChecklistItem("");
      setServiceId("");
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
        <h1>Create Checklist for {serviceName}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              value={checklist_item}
              onChange={(event) => setChecklistItem(event.target.value)}
              placeholder="Enter Step Details"
            />
            <label htmlFor="Enter Step">Enter Step Detail</label>
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
{/* LISTING THE STEPS AS ENTERED  */}
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div className="shadow p-4">
        <h1>{serviceName} Steps:</h1>
        <ul>
          {checklist.map((item) => (
            <li key={item.id}>{item.checklist_item}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
);};

export default ChecklistForm;
