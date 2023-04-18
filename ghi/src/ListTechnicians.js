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
    // // if (response.ok) {
    // //   setTechnician((Technician) => {
    // //     return Technician.filter((Technician) => Technician.id !== user_id);
    //   });
  }

  // useEffect(() => {
  //   if (token) {
  //     fetchData();
  //   }
  // }, [token]);

  return (
    <div>
      {token && user?.is_client === true ? (
        <div className="container">
          <h1 className=" text-center-mt-4">Tech List</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>biz</th>
                <th>employee Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>email</th>
                <th>address</th>
                <th>phone number</th>
              </tr>
            </thead>
            <tbody>
              {technician.map((technician) => {
                return (
                  <tr key={technician.id} value={technician.id}>
                    <td>{technician.username}</td>
                    <td>{technician.business_id}</td>
                    <td>{technician.employee_id}</td>
                    <td>{technician.first_name}</td>
                    <td>{technician.last_name}</td>
                    <td>{technician.email}</td>
                    <td>{technician.address}</td>
                    <td>{technician.phone_number}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => editToggle(technician)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => technicianDelete(technician.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
      {token && user?.is_technician ? (
        <div class="alert alert-danger" role="alert">
          This area is off limits.
        </div>
      ) : null}
    </div>
  );
}

export default TechnicianList;
