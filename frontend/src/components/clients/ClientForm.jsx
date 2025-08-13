import React, { useEffect, useState } from 'react';
import { createClient, updateClient } from '../../services/clientService';

export default function ClientForm({ onSuccess, initialData }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initialData?._id);

  useEffect(() => {
    if (initialData) setForm({ name: initialData.name || '', email: initialData.email || '', phone: initialData.phone || '', address: initialData.address || '' });
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await updateClient(initialData._id, form);
      } else {
        await createClient(form);
      }
      onSuccess?.();
      setForm({ name: '', email: '', phone: '', address: '' });
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
          {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Cadastrar cliente'}
        </button>
      </div>
    </form>
  );
}