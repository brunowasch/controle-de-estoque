import React, { useState } from 'react';
import { createProduct } from '../../services/productService';

export default function ProductForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct({ 
      ...form, 
      price: parseFloat(form.price), 
      stock: parseInt(form.stock) 
    });
    setForm({ name: '', description: '', price: '', stock: '' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Descrição" required />
      <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Preço" required />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Estoque" required />
      <button type="submit">Cadastrar Produto</button>
    </form>
  );
}
