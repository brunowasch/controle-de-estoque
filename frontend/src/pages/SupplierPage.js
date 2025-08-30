import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import '../css/style.css';
import FornecedoresIcon from "../assets/fornecedoresAzulIcon.png";
import searchIcon from "../assets/searchIcon.png";
import SupplierForm from '../components/suppliers/SupplierForm';
import SupplierList from '../components/suppliers/SupplierList';
import { getSuppliers, deleteSupplier } from '../services/supplierService';
import { useUser } from '../contexts/UserContext';

const SupplierPage = () => {
  const { user } = useUser();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); 

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await getSuppliers();
      setSuppliers(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return suppliers;
    return suppliers.filter(s =>
      [s.name, s.cnpj, s.email, s.phone, s.address]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q))
    );
  }, [suppliers, query]);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (supplier) => {
    setEditing(supplier);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar este fornecedor?")) {
      await deleteSupplier(id);
      fetchSuppliers();
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditing(null);
    fetchSuppliers();
  };

  return (
    <div className="d-flex min-vh-100 overflow-x-hidden">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column bg-light">
        <Header user={user} />
        <div className="container mt-4 flex-grow-1">
          <div className="bg-white rounded shadow p-4">
            {/* Cabeçalho */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
              <div className="d-flex align-items-center">
                <img src={FornecedoresIcon} alt="Fornecedores" width="50" height="50" className="me-2" />
                <p className="mb-0 fs-2 colorBlue">Fornecedores</p>
              </div>
              <button className="btn btn-primary rounded-pill mt-1" onClick={handleAdd}>
                Adicionar fornecedor +
              </button>
            </div>

            {/* Busca */}
            <div className="position-relative mb-3 w-100" style={{ maxWidth: '360px' }}>
              <img
                src={searchIcon}
                alt="lupa"
                style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', width: '30px', height: '30px', pointerEvents: 'none', opacity: 1.0 }}
              />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="form-control form-control-sm ps-5"
                style={{ borderColor: '#014F91', borderWidth: '2px', borderRadius: '15px', height: '40px', fontSize: '18px' }}
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            {/* Lista */}
            {loading ? (
              <p className="text-muted">Carregando...</p>
            ) : (
              <SupplierList suppliers={filtered} onDelete={handleDelete} onEdit={handleEdit} />
            )}
          </div>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editing ? 'Editar fornecedor' : 'Novo fornecedor'}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowForm(false)} />
                </div>
                <div className="modal-body">
                  <SupplierForm onSuccess={handleFormSuccess} initialData={editing || undefined} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupplierPage;