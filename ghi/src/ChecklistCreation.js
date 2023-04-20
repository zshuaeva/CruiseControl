import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function ChecklistCreation({ getChecklist, token, user }) {
  const [checklist_item, setChecklist_Item] = useState("");
  const [service_id, setService_id] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.checklist_item = checklist_item;
    data.service_id = service_id
    const submitUrl = "http://localhost:8000/api/checklist"
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    };
    const response = await fetch(submitUrl, fetchConfig);
    if (response.ok) {
      setChecklist_Item("");
      getChecklist();
    } else {
      console.error(
        "Error creating checklist; Please try again."
      )
    }
  }
  return (
    <div>
      {token && user?.is_client === true ? (
        <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="shadow p-4 mt-4">
                  <h1>Create Checklist</h1>
                     <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="service_name"
                          value={checklist_item}
                          onChange={(event) => setChecklist_Item(event.target.value)}
                          required
                          placeholder="name"
                          />
                          <label htmlFor="Name">Service Name</label>
                          </div>

                    </form>
                </div>
              </div>
            </div>
        </div>
        ) : null}
        {token && user?.is_technician ? (
        <div class="alert alert-danger" role="alert">
                This area is off limits.
        </div>
        ) : null}
    </div>
    );
}
export default ChecklistCreation
