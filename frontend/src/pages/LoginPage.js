import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginPage.css';
import stokDrawImage from '../assets/stokDraw.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);
        alert('Login realizado com sucesso!');
        navigate('/home');
      }
    } catch (err) {
      // Verifica se o erro tem uma mensagem de erro
      if (err.response && err.response.data) {
        if (err.response.data.error) {
          alert(err.response.data.error); // Exibe a mensagem de erro em um alert
        } else {
          alert('Erro inesperado ao tentar fazer login');
        }
      } else {
        alert('Erro de rede ou servidor');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="login-title">Fazer login</h2>
        <form onSubmit={handleSubmit} id="loginForm">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Digite seu email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              type="password"
              id="senha"
              name="password"
              className="form-control"
              placeholder="Digite sua senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill fs-5">
            Continuar
          </button>
          <p className="mt-3 text-center small">
          Não tem uma conta? <Link to="/cadastro">Crie aqui</Link> {}
          </p>
        </form>
      </div>

      <div className="image-container">
        <p className="image-text">Você está no só Bujiganga.</p>
        <img src={stokDrawImage} alt="Imagem ilustrativa" className="img-fluid" style={{ maxHeight: '90%', width: 'auto' }} />
      </div>
    </div>
  );
};

export default LoginPage;
