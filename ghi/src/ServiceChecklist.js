import React, { useEffect, useState } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";
import { useParams } from "react-router-dom";

function ServiceChecklist() {
        const { token } = useContext(AuthContext);
    const user = useUser(token);

    const { serviceId } = useParams();
    const [checklists, setChecklists] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editingChecklist, setEditingChecklist] = useState(null);

    const toggleEditMode = (checklist) => {
        setIsEditing(!isEditing);
        setEditingChecklist(checklist);
    };

    const getChecklists = async (serviceId) => {
        const listUrl = `http://localhost:8000/api/${serviceId}/checklist`;
        const response = await fetch(listUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });
        try {
            if (response.ok) {
                const data = await response.json();
                setChecklists(data);
            } else {
                throw new Error("Network response was not ok.");
            }
        } catch (error) {
            console.error(error);
        };
    };
    useEffect(() => {
        if (token) {
            getChecklists([]);
        }
    }, [token]);

    return (
               <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-4">
                    {isEditing ? (
                        <ServiceEdit
                            service={editingService}
                            toggleEditMode={toggleEditMode}
                            getServices={getServices}
                            token={token}
                            user={user}
                        />
                    ) : (
                        <ServiceCreation
                            getServices={getServices}
                            token={token}
                            user={user}
                        />
                    )}
                </div>
                <div className="col-12 col-md-8">
                    <div className="card-body">
                        <ServiceList
                            services={services}
                            toggleEditMode={toggleEditMode}
                            getServices={getServices}
                            token={token}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    )
     
};






export default ServiceChecklist;
