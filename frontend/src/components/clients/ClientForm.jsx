import React, { useState } from 'react';
import { createClient } from '../../services/clientService';

export default function ClientForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClient(form);
    setForm({ name: '', email: '', phone: '', address: '' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefone" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Endereço" />
      <button type="submit">Cadastrar Cliente</button>
    </form>
  );
}
