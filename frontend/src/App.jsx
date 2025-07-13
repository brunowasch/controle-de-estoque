import React, { useState } from 'react';
import ClientForm from './components/clients/ClientForm';
import ClientList from './components/clients/ClientList';
import SupplierForm from './components/suppliers/SupplierForm';
import SupplierList from './components/suppliers/SupplierList';
import ProductForm from './components/products/ProductForm';
import ProductList from './components/products/ProductList';

function App() {
  const [reloadClients, setReloadClients] = useState(false);
  const [reloadSuppliers, setReloadSuppliers] = useState(false);
  const [reloadProducts, setReloadProducts] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Cadastro de Clientes</h1>
      <ClientForm onSuccess={() => setReloadClients(!reloadClients)} />
      <ClientList key={reloadClients} />

      <hr />

      <h1>Cadastro de Fornecedores</h1>
      <SupplierForm onSuccess={() => setReloadSuppliers(!reloadSuppliers)} />
      <SupplierList key={reloadSuppliers} />

      <hr />

      <h1>Cadastro de Produtos</h1>
      <ProductForm onSuccess={() => setReloadProducts(!reloadProducts)} />
      <ProductList key={reloadProducts} />
    </div>
  );
}

export default App;
