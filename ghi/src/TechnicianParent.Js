import React, { useEffect, useState } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";
import TechnicianList from "./ListTechnicians";
import TechnicianForm from "./Technician/TechnicianForm";
import TechnicianEdit from "./TechnicianEdit";

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
    const listUrl = `http://localhost:8000/api/technicians/`;
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-4">
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
        <div className="col-12 col-md-8">
          <div className="card-body">
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
  );
}

export default TechnicianParent;
