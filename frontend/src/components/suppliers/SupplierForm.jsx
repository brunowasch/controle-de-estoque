import React, { useEffect, useState } from 'react';
import { createSupplier, updateSupplier } from '../../services/supplierService';

export default function SupplierForm({ onSuccess, initialData }) {
  const [form, setForm] = useState({ name: '', cnpj: '', email: '', phone: '', address: '' });
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initialData?._id);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        cnpj: initialData.cnpj || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await updateSupplier(initialData._id, form);
      } else {
        await createSupplier(form);
      }
      onSuccess?.();
      setForm({ name: '', cnpj: '', email: '', phone: '', address: '' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome *</label>
        <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">CNPJ *</label>
        <input className="form-control" name="cnpj" value={form.cnpj} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email *</label>
        <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Telefone</label>
        <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Endereço</label>
        <input className="form-control" name="address" value={form.address} onChange={handleChange} />
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Cadastrar fornecedor'}
        </button>
      </div>
    </form>
  );
}
