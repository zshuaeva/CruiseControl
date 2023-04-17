import React, { useEffect, useState } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";

import AppointmentApprovedList from "./AppointmentApprovedList";

function TechnicianLanding() {

  const { token } = useContext(AuthContext);
  const user = useUser(token);

  return (
    <div>
      <AppointmentApprovedList />
    </div>
  );
}

export default TechnicianLanding;
