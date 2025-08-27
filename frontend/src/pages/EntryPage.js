import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useUser } from '../contexts/UserContext';
import { getProducts } from '../services/productService';
import { getClients } from '../services/clientService';
import { getSuppliers } from '../services/supplierService';
import {
  createStockEntry,
  getStockEntries,
  updateStockEntry,
  deleteStockEntry
} from '../services/stockService';

import EditIcon from '../assets/editarIcon.png';
import DeleteIcon from '../assets/deleteIcon.png';
import searchIcon from "../assets/searchIcon.png";

const EntryPage = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [clients, setClients]   = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [entries, setEntries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); 

  const [form, setForm] = useState({
	productId: '',
	clientId: '',
	supplierId: '',
	quantity: '',
	unitPrice: '',
	reason: ''
  });

  const fetchAll = async () => {
	setLoading(true);
	try {
	  const [p, c, s, e] = await Promise.all([
		getProducts().catch(() => ({ data: [] })),
		getClients().catch(() => ({ data: [] })),
		getSuppliers().catch(() => ({ data: [] })),
		getStockEntries().catch(() => ({ data: [] })),
	  ]);
	  setProducts(Array.isArray(p.data) ? p.data : []);
	  setClients(Array.isArray(c.data) ? c.data : []);
	  setSuppliers(Array.isArray(s.data) ? s.data : []);
	  setEntries(Array.isArray(e.data) ? e.data : []);
	} finally {
	  setLoading(false);
	}
  };

  useEffect(() => { fetchAll(); }, []);

  const filtered = useMemo(() => {
	const term = q.trim().toLowerCase();
	if (!term) return entries;
	return entries.filter((m) =>
	  [m?.product?.name, m?.client?.name, m?.supplier?.name, m?.reason]
		.filter(Boolean)
		.some(v => String(v).toLowerCase().includes(term))
	);
  }, [entries, q]);

  const handleChange = (e) => {
	setError('');
	const { name, value } = e.target;
	setForm(f => ({ ...f, [name]: value }));
  };

  const openCreate = () => {
	setEditingId(null);
	setForm({ productId: '', clientId: '', supplierId: '', quantity: '', unitPrice: '', reason: '' });
	setShowForm(true);
  };

	const openEdit = (entry) => {
		setEditingId(entry._id);
		setForm({
			productId: entry?.product?._id || '', 
			clientId: entry?.client?._id || '',
			supplierId: entry?.supplier?._id || '',
			quantity: String(entry?.quantity ?? ''),
			unitPrice: entry?.unitPrice != null ? String(entry.unitPrice) : '',
			reason: entry?.reason || ''
		});
		setShowForm(true);
	};

  const handleDelete = async (id) => {
	if (!window.confirm('Tem certeza que deseja excluir esta entrada? Isso irá reverter o estoque.')) return;
	try {
	  await deleteStockEntry(id);
	  await fetchAll();
	} catch (err) {
	  console.error('Erro ao excluir entrada:', err);
	  const msg = err?.response?.data?.error || err?.message || 'Falha ao excluir entrada.';
	  setError(msg);
	}
  };

  const normalizeId = (maybeObjOrId) => {
	if (maybeObjOrId && typeof maybeObjOrId === 'object' && maybeObjOrId._id) return maybeObjOrId._id;
	return maybeObjOrId;
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	setSaving(true);
	setError('');
	try {
	  const payload = {
		productId: normalizeId(form.productId),
		clientId: form.clientId ? normalizeId(form.clientId) : undefined,
		supplierId: form.supplierId ? normalizeId(form.supplierId) : undefined,
		quantity: parseInt(form.quantity, 10),
		unitPrice: form.unitPrice === '' ? undefined : parseFloat(form.unitPrice),
		reason: form.reason || undefined,
	  };
	  if (!payload.productId) throw new Error('Selecione um produto.');
	  if (isNaN(payload.quantity) || payload.quantity <= 0) throw new Error('Quantidade inválida.');

	  if (editingId) {
		await updateStockEntry(editingId, payload);
	  } else {
		await createStockEntry(payload);
	  }

	  await fetchAll();
	  setShowForm(false);
	  setEditingId(null);
	  setForm({ productId: '', clientId: '', supplierId: '', quantity: '', unitPrice: '', reason: '' });
	} catch (err) {
	  console.error('Erro ao salvar entrada:', err);
	  const msg = err?.response?.data?.error || err?.message || 'Falha ao salvar entrada.';
	  setError(msg);
	} finally {
	  setSaving(false);
	}
  };

  return (
	<div className="d-flex min-vh-100">
	  <Sidebar />
	  <div className="flex-grow-1 d-flex flex-column bg-light">
		<Header user={user} />
		<div className="container mt-4 flex-grow-1">
		  <div className="bg-white rounded shadow p-4">
			{/* Cabeçalho */}
			<div className="d-flex justify-content-between align-items-center mb-4">
			  <h4 className="mb-0">Registros de Entrada</h4>
			  <button className="btn btn-primary rounded-pill" onClick={openCreate}>
				Adicionar entrada +
			  </button>
			</div>

			{/* Busca */}
			<div className="position-relative mb-3" style={{ maxWidth: '360px' }}>
			  <img
				src={searchIcon}
				alt="lupa"
				style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', width: '30px', height: '30px', pointerEvents: 'none', opacity: 1 }}
			  />
				<input
					type="text"
					placeholder="Pesquisar..."
					className="form-control form-control-sm ps-5"
					style={{ borderColor: '#014F91', borderWidth: '2px', borderRadius: '15px', height: '40px', fontSize: '18px' }}
					value={q}
					onChange={e => setQ(e.target.value)}
			 	/>
			</div>

			{/* Lista */}
			{loading ? (
			<p className="text-muted">Carregando...</p>
			) : filtered.length === 0 ? (
			<p className="text-center text-muted">Nenhuma entrada encontrada.</p>
			) : (
			<div className="table-responsive">
				<table className="table table-striped table-bordered align-middle text-center">
				<thead className="table-light">
					<tr>
					<th>Quando</th>
					<th>Produto</th>
					<th>Qtd</th>
					<th>Preço Unit.</th>
					<th>Cliente</th>
					<th>Fornecedor</th>
					<th>Observação</th>
					<th>Editar</th>
					<th>Deletar</th>
					</tr>
				</thead>
				<tbody>
					{filtered.map((m) => (
					<tr key={m._id}>
						<td>{m?.createdAt ? new Date(m.createdAt).toLocaleString('pt-BR') : '-'}</td>
						<td>{m?.product?.name || '-'}</td>
						<td>{m?.quantity ?? '-'}</td>
						<td>{typeof m?.unitPrice === 'number' ? m.unitPrice.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) : '-'}</td>
						<td>{m?.client?.name || '-'}</td>
						<td>{m?.supplier?.name || '-'}</td>
						<td className="text-start">{m?.reason || '-'}</td>
						<td>
						<img
							src={EditIcon}
							alt="Editar"
							width="20"
							height="20"
							style={{ cursor: 'pointer' }}
							onClick={() => openEdit(m)}
						/>
						</td>
						<td>
						<img
							src={DeleteIcon}
							alt="Deletar"
							width="20"
							height="20"
							style={{ cursor: 'pointer' }}
							onClick={() => handleDelete(m._id)}
						/>
						</td>
					</tr>
					))}
				</tbody>
				</table>
			</div>
			)}
		  </div>
		</div>

		{/* Modal para criar/editar entrada */}
		{showForm && (
		  <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-lg">
			  <div className="modal-content">
				<div className="modal-header">
				  <h5 className="modal-title">{editingId ? 'Editar entrada' : 'Adicionar entrada'}</h5>
				  <button type="button" className="btn-close" onClick={() => setShowForm(false)} />
				</div>
				<div className="modal-body">
				  {error && <div className="alert alert-danger">{error}</div>}

				  <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
					<div className="mb-2">
					  <label className="form-label">Produto *</label>
					  <select
						name="productId"
						className="form-select"
						value={form.productId}
						onChange={handleChange}
						required
					  >
						<option value="">Selecione...</option>
						{products.map(p => (
						  <option key={p._id} value={p._id}>{p.name}</option>
						))}
					  </select>
					</div>

					<div className="mb-2">
					  <label className="form-label">Quantidade *</label>
					  <input
						type="number"
						name="quantity"
						className="form-control"
						value={form.quantity}
						onChange={handleChange}
						min={1}
						required
					  />
					</div>

					<div className="mb-2">
					  <label className="form-label">Preço Unitário (opcional)</label>
					  <div className="input-group">
						<span className="input-group-text">R$</span>
						<input
						  type="number"
						  step="0.01"
						  name="unitPrice"
						  className="form-control"
						  value={form.unitPrice}
						  onChange={handleChange}
						  placeholder="0,00"
						/>
					  </div>
					</div>

					<div className="mb-2">
					  <label className="form-label">Cliente (opcional)</label>
					  <select
						name="clientId"
						className="form-select"
						value={form.clientId}
						onChange={handleChange}
					  >
						<option value="">—</option>
						{clients.map(c => (
						  <option key={c._id} value={c._id}>{c.name}</option>
						))}
					  </select>
					</div>

					<div className="mb-2">
					  <label className="form-label">Fornecedor (opcional)</label>
					  <select
						name="supplierId"
						className="form-select"
						value={form.supplierId}
						onChange={handleChange}
					  >
						<option value="">—</option>
						{suppliers.map(s => (
						  <option key={s._id} value={s._id}>{s.name}</option>
						))}
					  </select>
					</div>

					<div className="mb-2">
					  <label className="form-label">Observação (opcional)</label>
					  <input
						name="reason"
						className="form-control"
						value={form.reason}
						onChange={handleChange}
						placeholder="Ex.: Compra, doação, ajuste, correção..."
					  />
					</div>

					<div className="d-flex gap-2 pt-1">
					  <button className="btn btn-primary" type="submit" disabled={saving}>
						{saving ? 'Salvando...' : 'Salvar'}
					  </button>
					</div>
				  </form>
				</div>
			  </div>
			</div>
		  </div>
		)}

	  </div>
	</div>
  );
}

export default EntryPage;