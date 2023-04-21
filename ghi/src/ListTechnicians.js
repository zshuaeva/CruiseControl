function TechnicianList({
  technician,
  token,
  getTechnicians,
  editToggle,
  user,
}) {
  async function technicianDelete(user_id) {
    const deleteUrl = `http://localhost:8000/api/accounts/${user_id}`;
    const response = await fetch(deleteUrl, {
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
    });
    await getTechnicians();
  }


  return (
    <div>
      {token && user?.is_client === true ? (
        <div>
          <div>
            <div>
              <div className="table-responsive-md rounded">
                <h1 className=" text-center text-white">Technician List</h1>
                <table className="table table-fixed table-hover table-dark">
                  <thead>
                    <tr>
                      <th scope="col" className="col">
                        Username
                      </th>
                      <th scope="col" className="col">
                        Employee Id
                      </th>
                      <th scope="col" className="col">
                        First Name
                      </th>
                      <th scope="col" className="col">
                        Last Name
                      </th>
                      <th scope="col" className="col">
                        Email
                      </th>
                      <th scope="col" className="col">
                        address
                      </th>
                      <th scope="col" className="col">
                        phone number
                      </th>
                      <th scope="col" className="col text-warning">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technician.map((technician) => {
                      return (
                        <tr key={technician.id} value={technician.id}>
                          <td className="col">{technician.username}</td>
                          <td className="col">{technician.employee_id}</td>
                          <td className="col">{technician.first_name}</td>
                          <td className="col">{technician.last_name}</td>
                          <td className="col">{technician.email}</td>
                          <td className="col">{technician.address}</td>
                          <td className="col">{technician.phone_number}</td>
                          <td className="col">
                            <div className="btn-group gap-2">
                              <button
                                className="btn btn-success btn-sm rounded-0"
                                data-toggle="tooltip"
                                title="Edit"
                                onClick={() => editToggle(technician)}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-danger btn-sm rounded-0"
                                data-toggle="tooltip"
                                title="Delete"
                                onClick={() => technicianDelete(technician.id)}
                              >
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {token && user?.is_technician ? (
        <div className="alert alert-danger" role="alert">
          This area is off limits.
        </div>
      ) : null}
    </div>
  );
}

export default TechnicianList;
