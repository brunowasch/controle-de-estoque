// Importar Routes e Route do React Router
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Importando a página de login
import HomePage from './pages/HomePage'; // Importando a HomePage, se necessário
import CadastroPage from './pages/CadastroPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />  {/* Página de Login */}
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/home" element={<HomePage />} /> {/* Página Inicial (Home) */}
    </Routes>
  );
}

export default App;
