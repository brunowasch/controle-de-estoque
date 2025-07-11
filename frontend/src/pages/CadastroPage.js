import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/style.css'; // seu CSS personalizado
import stokDrawImage from '../assets/stokDraw.png'; // imagem ilustrativa

const CadastroPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users/register', {
        nome,
        email,
        password: senha,
      });
      navigate('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow w-100 mx-auto"
        style={{ maxWidth: '850px', maxHeight: '95%' }}
      >
        <div className="row g-0 h-100">
          {/* Coluna do formulário */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            <p className="mb-3 fs-4 text-center">Cadastre-se</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="form-control"
                  required
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  required
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="password"
                  className="form-control"
                  required
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100 rounded-pill fs-5">
                  Concluir
                </button>
              </div>
              <p className="mt-3 text-center small">
                Já tem uma conta? <a href="/">Entre aqui</a>
              </p>
            </form>
          </div>

          {/* Coluna da imagem */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white text-center backgroundBlue p-5">
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
    </div>
  );
};

export default CadastroPage;
