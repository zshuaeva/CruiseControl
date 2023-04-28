function ClientInfo({ clients, token, user }) {



  return (
    <div>
      {token && user?.is_client === true ? (
        <div>
          <div>
            <div>
              <div className="table-responsive-md rounded">
                <h1 className=" text-center text-white">Client List</h1>
                <table className="table table-fixed table-hover table-dark">
                  <thead>
                    <tr>
                      <th scope="col" className="col">
                        First Name
                      </th>
                      <th scope="col" className="col">
                        Last Name
                      </th>
                      <th scope="col" className="col">
                        Employee Id
                      </th>
                      <th scope="col" className="col">
                        Email
                      </th>
                      <th scope="col" className="col">
                        Address
                      </th>
                      <th scope="col" className="col">
                        Phone Number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((clientData) => (
                      <tr key={clientData.id}>
                        <td>{clientData.first_name}</td>
                        <td>{clientData.last_name}</td>
                        <td>{clientData.employee_id}</td>
                        <td>{clientData.email}</td>
                        <td>{clientData.address}</td>
                        <td>{clientData.phone_number}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ClientInfo;
