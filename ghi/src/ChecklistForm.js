import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function ChecklistForm({ getChecklists, user }) {
  const { token } = useContext(AuthContext);
  const [checklist_item, setChecklistItem] = useState("");
  const [service, setService] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [numForms, setNumForms] = useState(1);
  const [formData, setFormData] = useState([{ checklist_item: "", service_id: "" }]);

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

  const handleSubmit = async (event, index) => {
    event.preventDefault();
    const data = {};
    data.checklist_item = formData[index].checklist_item;
    data.service_id = formData[index].service_id;

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
      setServiceId("");
    } else {
      console.error("Error creating checklist, please check input");
    }
  };

  const handleAddForm = () => {
    setNumForms(numForms + 1);
    setFormData([...formData, { checklist_item: "", service_id: "" }]);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newData = [...formData];
    newData[index][name] = value;
    setFormData(newData);
  };

return (
  <>
    <div className="container-fluid d-flex justify-content-center mb-3">
      <div className="shadow p-4 mt-4 w-75">
        <h1>Create Checklist for (placeholder checklistname)</h1>

        {formData.map((data, index) => {
          return (
            <form key={index} onSubmit={(event) => handleSubmit(event, index)}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="checklist_item"
                  value={data.checklist_item}
                  onChange={(event) => handleInputChange(event, index)}
                  placeholder="Enter Step Details"
                />
                <label htmlFor="Enter Step">Enter Step Detail</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  onChange={(event) => handleInputChange(event, index)}
                  value={data.service_id}
                  name="service_id"
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

              <button className="btn btn-primary me-2" type="submit">
                Submit Step Detail
              </button>
            </form>
          );
        })}

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleAddForm}>
            + additional step
          </button>
        </div>
      </div>
    </div>
  </>
);
};

export default ChecklistForm;
