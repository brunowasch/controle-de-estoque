import React from 'react';
import EditIcon from "../../assets/editarIcon.png";
import DeleteIcon from "../../assets/deleteIcon.png";

function formatBRL(v){
  if (typeof v !== 'number') return '-';
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ProductList({ products, onDelete, onEdit }) {
    if (!products?.length) {
    return (
      <div className="text-center my-4">
        <p className="text-muted">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td className="text-start">{p.description}</td>
              <td>{formatBRL(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                <img src={EditIcon} alt="Editar" width="20" height="20" style={{cursor:'pointer'}} onClick={() => onEdit?.(p)} />
              </td>
              <td>
                <img src={DeleteIcon} alt="Deletar" width="20" height="20" style={{cursor:'pointer'}} onClick={() => onDelete?.(p._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}