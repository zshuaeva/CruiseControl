import React, { useEffect, useState } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";
import { Link, useParams, useNavigate } from "react-router-dom";

function AppointmentDetail() {
    const { token } = useContext(AuthContext);
    const user = useUser(token);
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});
    const navigate = useNavigate();

    const getAppointment = async (appointmentId) => {
        const url = `http://localhost:8000/api/appointments/${appointmentId}`;
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            const data = await response.json();
            setAppointment(data);
        }
    };

    useEffect(() => {
        if (token) {
            getAppointment(appointmentId);
        }
    }, [token, appointmentId]);

    const deleteAppointment = async (appointmentId) => {
        await fetch(`http://localhost:8000/api/appointments/${appointmentId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        navigate(-1);
    };

    const approveAppointment = async (appointmentId) => {
        await fetch(`http://localhost:8000/api/appointments/${appointmentId}/approve`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
        });
        await getAppointment(appointmentId);
        navigate(-1);
    };
    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="jumbotron bg-light">
                    <div className="container">
                        <h1 className="display-4">Appointment Details</h1>
                        <p className="lead">Here are the details of your appointment:</p>
                        <hr className="my-4" />
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Customer Name:</strong> {appointment.customer_name}</li>
                            <li className="list-group-item"><strong>Customer Phone:</strong> {appointment.customer_phone}</li>
                            <li className="list-group-item"><strong>Vehicle Make:</strong> {appointment.vehicle_make}</li>
                            <li className="list-group-item"><strong>Vehicle Model:</strong> {appointment.vehicle_model}</li>
                            <li className="list-group-item"><strong>Vehicle Year:</strong> {appointment.vehicle_year}</li>
                            <li className="list-group-item"><strong>Vehicle Color:</strong> {appointment.vehicle_color}</li>
                            <li className="list-group-item"><strong>Date of Service:</strong> {appointment.date_of_service}</li>
                            <li className="list-group-item"><strong>Service Name:</strong> {appointment.service_name}</li>
                            <li className="list-group-item"><strong>Notes:</strong> {appointment.notes}</li>
                            <li className="list-group-item"><strong>Status:</strong> {appointment.is_approved ? "Approved" : "Pending"}</li>
                        </ul>
                        {token && user?.is_client && (
                            <p className="lead mt-4">
                                {!appointment.is_approved && (
                                    <button
                                        type="button"
                                        onClick={() => approveAppointment(appointmentId)}
                                        className="btn btn-success btn-sm"
                                    >
                                        Approve
                                    </button>
                                )}
                                <Link
                                    to={`/appointment/${appointmentId}/edit`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => deleteAppointment(appointmentId)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AppointmentDetail;
