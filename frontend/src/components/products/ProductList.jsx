import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../services/productService';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - R$ {p.price.toFixed(2)} (Estoque: {p.stock})
            <br />
            {p.description}
            <br />
            <button onClick={() => handleDelete(p._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
