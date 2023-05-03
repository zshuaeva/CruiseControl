import React from "react";

import { Link } from "react-router-dom";

function AppointmentApprovedList({ user, getAppointments, appointments, token }) {
  const deleteAppointment = async (id) => {
    await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await getAppointments();
  };

  return (
    <div>
      {user?.is_client && <h1 className="text-center">Approved Appointments</h1>}
      {/* {user?.is_technician && <h1 } */}
      <table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>Customer Name</th>
            <th>Vehicle Model</th>
            <th>Date of Service</th>
            <th>Service Name</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {appointments
            .sort(
              (a, b) =>
                new Date(b.date_of_service) - new Date(a.date_of_service)
            )
            .map((appointment, index) => {
              return (
                <tr key={appointment.id}>
                  <td>{appointment.customer_name}</td>
                  <td>{appointment.vehicle_model}</td>
                  <td>{appointment.date_of_service}</td>
                  <td>{appointment.service_name}</td>
                  <td>
                    <Link
                      className="btn btn-primary btn-sm mr-2"
                      to={`/appointment/${appointment.id}`}
                      role="button"
                    >
                      Details
                    </Link>
                    {token && user?.is_client && (
                      <button
                        type="button"
                        onClick={() => deleteAppointment(appointment.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default AppointmentApprovedList;
