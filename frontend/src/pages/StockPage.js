import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useUser } from '../contexts/UserContext';
import '../css/style.css';

import EstoqueIcon from "../assets/estoqueAzulIcon.png";
import searchIcon from "../assets/searchIcon.png";

import { getProducts, deleteProduct } from '../services/productService';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';

const StockPage = () => {
  const { user } = useUser();

  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  // Estados do modal de formulário (criar/editar)
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // guarda o produto a editar (ou null para novo)

  async function load() {
    try {
      setLoading(true);
      setError('');
      const { data } = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.error || 'Falha ao carregar produtos.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;
    return products.filter(p =>
      (p.name || '').toLowerCase().includes(term) ||
      (p.category || '').toLowerCase().includes(term) ||
      (p.description || '').toLowerCase().includes(term)
    );
  }, [q, products]);

  const totalItens = useMemo(
    () => filtered.reduce((sum, p) => sum + (Number(p.stock) || 0), 0),
    [filtered]
  );

  async function handleDelete(id) {
    if (!window.confirm('Deseja realmente deletar este produto?')) return;
    try {
      await deleteProduct(id);
      await load();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Falha ao deletar produto.');
    }
  }

  // Abrir modal em modo de edição
  function handleEdit(prod) {
    setEditing(prod);     // prod precisa conter _id, name, price, stock etc.
    setShowForm(true);
  }

  // Abrir modal em modo de criação
  function handleCreate() {
    setEditing(null);
    setShowForm(true);
  }

  // Fechar modal
  function handleCloseForm() {
    setShowForm(false);
    setEditing(null);
  }

  // Após salvar no ProductForm, recarrega a lista e fecha o modal
  async function handleFormSuccess() {
    await load();
    handleCloseForm();
  }

  return (
    <div className="d-flex min-vh-100">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column bg-light">
        <Header user={user} />

        <div className="container mt-4 flex-grow-1">
          <div className="bg-white rounded shadow p-4">

            {/* Cabeçalho */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <img
                  src={EstoqueIcon}
                  alt="Estoque"
                  width="50"
                  height="50"
                  className="me-2"
                />
                <p className="mb-0 fs-2 colorBlue">Estoque</p>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="text-end me-2">
                  <div className="fw-semibold">Total de itens: {totalItens}</div>
                  <div className="text-muted" style={{fontSize: 13}}>
                    {filtered.length} produto(s) listado(s)
                  </div>
                </div>
              </div>
            </div>

            {/* Busca */}
            <div className="position-relative mb-3" style={{ maxWidth: '360px' }}>
              <img
				src={searchIcon}
				alt="lupa"
				style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', width: '30px', height: '30px', pointerEvents: 'none', opacity: 1.0 }}
			  />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="form-control form-control-sm ps-5"
                style={{
                  borderColor: '#014F91',
                  borderWidth: '2px',
                  borderRadius: '15px',
                  height: '40px',
                  fontSize: '18px',
                }}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            {/* Status */}
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && (
              <div className="text-muted">Carregando produtos...</div>
            )}

            {/* Lista */}
            {!loading && !error && (
              <ProductList
                products={filtered}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showForm && createPortal(
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">{editing ? 'Editar produto' : 'Novo produto'}</h5>
                <button type="button" className="btn-close" onClick={handleCloseForm} />
              </div>

              <div className="modal-body">
                <ProductForm onSuccess={handleFormSuccess} initialData={editing || undefined} />
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default StockPage;