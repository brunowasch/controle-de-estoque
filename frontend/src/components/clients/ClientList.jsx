import React from 'react';
import EditIcon from "../../assets/editarIcon.png";
import DeleteIcon from "../../assets/deleteIcon.png";

export default function ClientList({ clients, onDelete, onEdit }) {
  if (!clients?.length) {
  return (
    <div className="text-center my-4">
      <p className="text-muted">Nenhum cliente encontrado.</p>
    </div>
  );
}

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone || '-'}</td>
              <td>{c.address || '-'}</td>
              <td>
                <img
                  src={EditIcon}
                  alt="Editar"
                  width="20"
                  height="20"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onEdit?.(c)}
                />
              </td>
              <td>
                <img
                  src={DeleteIcon}
                  alt="Deletar"
                  width="20"
                  height="20"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onDelete?.(c._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
