import React, { useEffect, useState } from 'react';
import { getSuppliers, deleteSupplier } from '../../services/supplierService';

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    const res = await getSuppliers();
    setSuppliers(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    await deleteSupplier(id);
    fetchSuppliers();
  };

  return (
    <div>
      <h2>Fornecedores</h2>
      <ul>
        {suppliers.map(s => (
          <li key={s._id}>
            {s.name} - {s.email} - CNPJ: {s.cnpj}
            <button onClick={() => handleDelete(s._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
