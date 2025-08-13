import React from 'react';
import EditIcon from "../../assets/editarIcon.png";
import DeleteIcon from "../../assets/deleteIcon.png";

export default function SupplierList({ suppliers, onDelete, onEdit }) {
  if (!suppliers?.length) {
  return (
    <div className="text-center my-4">
      <p className="text-muted">Nenhum fornecedor encontrado.</p>
    </div>
  );
}


  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.cnpj}</td>
              <td>{s.email}</td>
              <td>{s.phone || '-'}</td>
              <td>{s.address || '-'}</td>
              <td>
                <img
                  src={EditIcon}
                  alt="Editar"
                  width="20"
                  height="20"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onEdit?.(s)}
                />
              </td>
              <td>
                <img
                  src={DeleteIcon}
                  alt="Deletar"
                  width="20"
                  height="20"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onDelete?.(s._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
