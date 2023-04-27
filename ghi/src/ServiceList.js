import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
// import { useContext } from "react";
// import useUser from "./useUser";

function ServiceList({ services, toggleEditMode, getServices, token, user }) {
  // const { token } = useContext(AuthContext);
  // const user = useUser(token);
  // const [services, setServices] = useState([]);

  const deleteService = async (service_id) => {
    await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/services/${service_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await getServices();
  };

  // const getServices = async () => {
  //     const listUrl = "http://localhost:8000/api/services";
  //     const response = await fetch(listUrl, {
  //         headers: { Authorization: `Bearer ${token}` },
  //     });
  //     if (response.ok) {
  //         const data = await response.json();
  //         setServices(data);
  //     }
  // };

  // useEffect(() => {
  //     if (token) {
  //         getServices();
  //     }
  // }, [token]);

  return (
    <div>
      {token && user?.is_client === true ? (
        <>
          <h1 className="text-center">List of Services</h1>
          <table className="table table-striped">
            <thead className="text-center">
              <tr className="header">
                <th>Type</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {services
                .sort((a, b) => a.service_type.localeCompare(b.service_type))
                .map((service, index) => {
                  return (
                    <tr key={`${service.service_id}-${index}`}>
                      <td>
                        <Link
                          to={`/services/${service.id}`}
                          className="text-reset text-decoration-none"
                        >
                          {service.service_type}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/services/${service.id}`}
                          className="text-reset text-decoration-none"
                        >
                          {service.service_name}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/services/${service.id}`}
                          className="text-reset text-decoration-none"
                        >
                          {service.service_description}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/services/${service.id}`}
                          className="text-reset text-decoration-none"
                        >
                          {service.service_price}
                        </Link>
                      </td>
                      <td>
                        <button type="button" className="btn btn-success">
                          <Link
                            to={`/services/${service.id}/checklist`}
                            className="btn btn"
                          >
                            Checklist
                          </Link>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleEditMode(service)}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteService(service.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : null}
      {token && user?.is_technician ? (
        <div class="alert alert-danger" role="alert">
          This area is off limits.
        </div>
      ) : null}
    </div>
  );
}
export default ServiceList;
