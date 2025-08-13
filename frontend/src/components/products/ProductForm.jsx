import React, { useEffect, useState } from 'react';
import { createProduct, updateProduct } from '../../services/productService';

function toNumberBR(v) {
  if (v === '' || v === null || v === undefined) return NaN;
  return parseFloat(String(v).replace(/\./g, '').replace(',', '.'));
}

export default function ProductForm({ onSuccess, initialData }) {
  const isEdit = Boolean(initialData?._id);

  const [form, setForm] = useState({
    name: '',
    unitPrice: '',   
    quantity: '',    
    minStock: '',    
    category: '',    
    description: ''  
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!initialData) return;
    setForm({
      name: initialData.name || '',
      unitPrice:
        typeof initialData.price === 'number'
          ? String(initialData.price)
          : (initialData.price || ''),
      quantity:
        typeof initialData.stock === 'number'
          ? String(initialData.stock)
          : (initialData.stock || ''),
      minStock:
        typeof initialData.minStock === 'number'
          ? String(initialData.minStock)
          : (initialData.minStock || ''),
      category: initialData.category || '',
      description: initialData.description || ''
    });
  }, [initialData]);

  const handleChange = (e) => {
    setError('');
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const priceParsed =
        String(form.unitPrice).includes(',') ? toNumberBR(form.unitPrice) : parseFloat(form.unitPrice);
      const stockParsed = parseInt(form.quantity, 10);
      const minStockParsed = form.minStock === '' ? undefined : parseInt(form.minStock, 10);

      if (!form.name.trim()) throw new Error('Informe o nome do produto.');
      if (isNaN(priceParsed)) throw new Error('Preço inválido.');
      if (isNaN(stockParsed)) throw new Error('Quantidade inválida.');
      if (minStockParsed !== undefined && (isNaN(minStockParsed) || minStockParsed < 0)) {
        throw new Error('Estoque mínimo inválido.');
      }

      // (opcional) regra de UX: avisar se minStock > quantity
      if (minStockParsed !== undefined && minStockParsed > stockParsed) {
        throw new Error('Estoque mínimo não pode ser maior que a quantidade.');
      }

      const payload = {
        name: form.name,
        description: form.description || undefined,
        price: priceParsed,
        stock: stockParsed,
        minStock: minStockParsed,
        category: form.category || undefined,
      };

      if (isEdit) {
        await updateProduct(initialData._id, payload);
      } else {
        await createProduct(payload);
      }

      onSuccess?.();
      setForm({
        name: '',
        unitPrice: '',
        quantity: '',
        minStock: '',
        category: '',
        description: ''
      });
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      const msg = err?.response?.data?.error || err?.message || 'Falha ao salvar produto.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Nome do Produto */}
      <div className="mb-3">
        <label className="form-label">Nome do Produto *</label>
        <input
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Preço Unitário (R$) */}
      <div className="mb-3">
        <label className="form-label">Preço Unitário *</label>
        <div className="input-group">
          <span className="input-group-text">R$</span>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="unitPrice"
            value={form.unitPrice}
            onChange={handleChange}
            placeholder="0,00"
            required
          />
        </div>
      </div>

      {/* Quantidade & Estoque Mínimo */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Quantidade *</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min={0}
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Estoque Mínimo</label>
          <input
            type="number"
            className="form-control"
            name="minStock"
            value={form.minStock}
            onChange={handleChange}
            min={0}
          />
        </div>
      </div>

      {/* Categoria */}
      <div className="mb-3">
        <label className="form-label">Categoria</label>
        <input
          className="form-control"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder=""
        />
      </div>

      {/* Descrição */}
      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <textarea
          className="form-control"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Cadastrar produto'}
        </button>
      </div>
    </form>
  );
}
