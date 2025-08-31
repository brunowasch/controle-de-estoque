// Importar Routes e Route do React Router
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Importando a página de login
import HomePage from './pages/HomePage'; // Importando a HomePage, se necessário
import CadastroPage from './pages/CadastroPage';
import ForgotPasswordPage from './pages/forgotPasswordPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />  {/* Página de Login */}
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/home" element={<HomePage />} /> {/* Página Inicial (Home) */}
      <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
}

export default App;
