import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";

import AppointmentApprovedList from "./AppointmentApprovedList";

function TechnicianLanding() {

  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const { token } = useContext(AuthContext);
  const user = useUser(token);

  const getAppointments = async () => {
    const listUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments`;
    const response = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      const approvedAppointments = data.filter(
        (appointment) => appointment.is_approved
      );
      setApprovedAppointments(approvedAppointments);

    };
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  return (
    <div>
      <AppointmentApprovedList appointments={approvedAppointments} />
    </div>
  );
}

export default TechnicianLanding;
