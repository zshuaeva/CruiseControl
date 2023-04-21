import React, { useState, useEffect } from "react";


function ChecklistEdit(props) {
    const [id , setId] = useState(props.checklist.id);
    const [checklist_item, setChecklist_Item] = useState(props.checklist.checklist_item);
    const [service_id, setService_Id] = useState(props.checklist.service_id);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.id = id;
        data.checklist_item = checklist_item;
        data.service_id = service_id;
        const submitUrl = `http://localhost:8000/api/checklist/${id}`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${props.token}`,
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(submitUrl, fetchConfig);
        if (response.ok) {
            await response.json();
            props.getChecklists();
            props.toggleEditMode();
        } else {
            console.error(
                "Error updating checklist; Please try again."
            )
        };
    };
    return (
      <div>
        {props.token && props.user?.is_client === true ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="shadow p-4 mt-4">
                  <h1>Edit A Checklist Item</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="checklist_item"
                        value={checklist_item}
                        onChange={(event) =>
                          setChecklist_Item(event.target.value)
                        }
                        required
                        placeholder="checklist_item"
                      />
                      <label htmlFor="checklist_item">Checklist Item</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="service_id"
                        value={service_id}
                        onChange={(event) => setService_Id(event.target.value)}
                        required
                        placeholder="service_id"
                      />
                      <label htmlFor="service_id">Service Id</label>
                    </div>
                    <button className="btn btn-">Update</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {props.toke && props.user?.is_client === false ? (
            <div className= "alert alert-danger" role="alert">
                This area is off limits.
            </div>
        ) : null}
      </div>
    );

}
export default ChecklistEdit;