import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import ClientEdit from "./ClientEdit";
import ClientInfo from "./ClientInfo";
import "./ClientInfoParent.css";

function ClientInfoParent() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [clients, setClients] = useState([]);
  const [userId, setUserId] = useState("");

  const getClients = async () => {
    const clientsUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/clients`;
    const response = await fetch(clientsUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setClients(data);
    }
  };

  useEffect(() => {
    if (user?.is_client) {
      setUserId(user?.id);
    }
  }, [user]);

  useEffect(() => {
    const getClient = async () => {
      if (userId && token) {
        const response = await fetch(
          `${process.env.REACT_APP_USER_SERVICE_API_HOST}/client/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setClients([data]);
        }
      }
    };
    getClient();
  }, [token, userId]);

  const handleClientEdit = async (client) => {
    const clientsCopy = [...clients];
    const clientIndex = clientsCopy.findIndex((c) => c.id === client.id);
    clientsCopy[clientIndex] = client;
    setClients(clientsCopy);
  };

  return (
    <div>
      <div id="row">
        <div className="row row-cols-sm-3">
          <div className="col align-self-end">
            {clients.map((clientData) => (
              <ClientEdit
                key={clientData.id}
                client={clientData}
                token={token}
                user={user}
                handleClientEdit={handleClientEdit}
              />
            ))}
          </div>
          <div>
            <ClientInfo clients={clients} token={token} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientInfoParent;
