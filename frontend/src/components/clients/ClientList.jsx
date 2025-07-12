import React, { useEffect, useState } from 'react';
import { getClients, deleteClient } from '../../services/clientService';

export default function ClientList() {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const res = await getClients();
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    await deleteClient(id);
    fetchClients();
  };

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clients.map(client => (
          <li key={client._id}>
            {client.name} ({client.email}) - {client.phone}
            <button onClick={() => handleDelete(client._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
