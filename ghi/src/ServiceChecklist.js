import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Link, useParams, useNavigate } from "react-router-dom";

function ServiceChecklist() {
    const { token } = useContext(AuthContext);
    const { serviceId } = useParams();

    const [checklistItems, setChecklistItems] = useState([])


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
        <p> this is working {serviceId}  </p>
    );

}

export default ServiceChecklist;
