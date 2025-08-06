// Importar Routes e Route do React Router
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Importando a página de login
import HomePage from './pages/HomePage'; // Importando a HomePage, se necessário
import CadastroPage from './pages/CadastroPage';
import ForgotPasswordPage from './pages/forgotPasswordPage';
import ProductsPage from './pages/ProductsPage';
import EntryPage from './pages/EntryPage';
import OutflowPage from './pages/OutflowPage';
import StockPage from './pages/StockPage';
import SupplierPage from './pages/SupplierPage';
import ClientPage from './pages/ClientPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />  {/* Página de Login */}
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/home" element={<HomePage />} /> {/* Página Inicial (Home) */}
      <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      <Route path="/produtos" element={<ProductsPage />} />
      <Route path="/entradas" element={<EntryPage />} />
      <Route path="/saidas" element={<OutflowPage />} />
      <Route path="/estoque" element={<StockPage />} />
      <Route path="/fornecedores" element={<SupplierPage />} />
      <Route path="/clientes" element={<ClientPage />} />
    </Routes>
  );
}

export default App;
