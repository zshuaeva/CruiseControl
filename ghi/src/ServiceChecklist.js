import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ChecklistCreation from "./ChecklistCreation";
import ChecklistList from "./ChecklistList";
import useUser from "./useUser";
import ChecklistEdit from "./ChecklistEdit";

function ServiceChecklist() {
    const { token } = useContext(AuthContext);
    const user = useUser(token);
    const { serviceId } = useParams();
    const [checklistItems, setChecklistItems] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [editingChecklist, setEditingChecklist] = useState(null);
    const toggleEditMode = (checklist) => {
        setIsEditing(!isEditing);
        setEditingChecklist(checklist);
    };

const fetchServiceChecklistEntry = useCallback(async (serviceId) => {
  const url = `http://localhost:8000/services/${serviceId}/checklist`
  const fetchConfig = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, fetchConfig);
  const data = await response.json();
  setChecklistItems(data);
}, [token]);

useEffect(() => {
  if (token) {
    fetchServiceChecklistEntry(serviceId);
  }
}, [token, serviceId, fetchServiceChecklistEntry]);



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-4">
                    {isEditing ? (
                    <ChecklistEdit
                        checklist={editingChecklist}
                        token={token}
                        checklistItems={checklistItems}
                        toggleEditMode={toggleEditMode}
                        getChecklist={fetchServiceChecklistEntry}
                        user={user}
                        serviceId={serviceId}
                    />
                    ) : (

                <ChecklistCreation
            token={token}
            getChecklist={fetchServiceChecklistEntry}
            user={user}
            serviceId={serviceId}
            />
                    )}
            </div>


                    <div className="col-12 col-md-8">
                    <div className="card-body">
                        <ChecklistList
                            toggleEditMode={toggleEditMode}
                            checklistitems={checklistItems}
                            getChecklist={fetchServiceChecklistEntry}
                            token={token}
                            user={user}
                            serviceId={serviceId}
                        />
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default ServiceChecklist;
