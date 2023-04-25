import React, { useEffect, useState } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";
import TechnicianList from "./ListTechnicians";
import TechnicianForm from "./Technician/TechnicianForm";
import TechnicianEdit from "./TechnicianEdit";
import "./TechnicianParent.css";

function TechnicianParent() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [technician, setTechnician] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);

  const editToggle = (technician) => {
    setToggle(!toggle);
    setEditingTechnician(technician);
  };

  const getTechnicians = async () => {
    const listUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/technicians`;
    const response = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setTechnician(data);
    }
  };

  useEffect(() => {
    if (token) {
      getTechnicians();
    }
  }, [token]);

  return (
    <div>
      <div id="row">
        <div className="row row-col-sm-3">
          <div className="col align-self-end">
            {toggle ? (
              <TechnicianEdit
                technician={editingTechnician}
                editToggle={editToggle}
                getTechnician={getTechnicians}
                token={token}
                user={user}
              />
            ) : (
              <TechnicianForm
                getTechnician={getTechnicians}
                token={token}
                user={user}
              />
            )}
          </div>
          <div id="table" className="col col-lg-9">
            <div>
              <TechnicianList
                technician={technician}
                editToggle={editToggle}
                getTechnicians={getTechnicians}
                token={token}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianParent;
