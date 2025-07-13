import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/style.css';
import stokDrawImage from '../assets/stokDraw.png';
import { login } from '../services/userService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      if (response.status === 200) {
        alert('Login realizado com sucesso!');
        navigate('/home');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Email ou senha incorretos.');
      } else {
        setError('Erro inesperado ao tentar fazer login.');
      }
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow flex-column flex-md-row w-100 mx-auto" style={{ maxWidth: '850px' }}>


        <div className="col-md-6 p-5 d-flex flex-column">

          <div className="d-flex align-items-center" style={{ height: '100px' }}>
            <p className="fs-4 mb-0 text-center w-100">Fazer login</p>
          </div>

          <form onSubmit={handleSubmit} id="loginForm" className="mt-3">

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
            {error && <div className="alert alert-danger text-center py-1 my-2 small">{error}</div>}
            <button type="submit" className="btn btn-primary w-100 rounded-pill fs-5 mt-1">
              Continuar
            </button>
            <p className="mt-3 text-center small">
              Não tem uma conta? <Link to="/cadastro">Crie aqui</Link>
            </p>
          </form>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white text-center backgroundBlue p-4 p-md-5">
          <p className="fs-4 mb-4">Você está no só Bujiganga.</p>
          <img
            src={stokDrawImage}
            alt="Imagem ilustrativa"
            className="img-fluid"
            style={{ maxHeight: '350px' }}
          />
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
