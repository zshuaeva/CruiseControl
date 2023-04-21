import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ChecklistCreation from "./ChecklistCreation";
import useUser from "./useUser";

function ServiceChecklist() {
    const { token } = useContext(AuthContext);
    const user = useUser(token);
    const { serviceId } = useParams();

    const [checklistItems, setChecklistItems] = useState([])
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const [editingService, setEditingService] = useState(null);
    const toggleEditMode = (service) => {
        setIsEditing(!isEditing);
        setEditingService(service);
    };

    const fetchServiceChecklistEntry = async (serviceId) => {
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
        console.log(data)
        setChecklistItems(data);
    }
    useEffect(() => {
        if (token) {
            fetchServiceChecklistEntry(serviceId);
        }
    }, [token, serviceId]);


    return (
        <div className="container-fluid">
            <div className="row">

                <ChecklistCreation
            token={token}
            user={user}
            />

            </div>
        </div>
    );

}

export default ServiceChecklist;
