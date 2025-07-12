import React, { useState } from 'react';
import { createSupplier } from '../../services/supplierService';

export default function SupplierForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSupplier(form);
    setForm({ name: '', cnpj: '', email: '', phone: '', address: '' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
      <input name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefone" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Endereço" />
      <button type="submit">Cadastrar Fornecedor</button>
    </form>
  );
}
