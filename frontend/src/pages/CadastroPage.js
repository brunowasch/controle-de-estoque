import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Corrigir a importação
import axios from 'axios';
import '../css/LoginPage.css';  // O mesmo estilo de LoginPage, só reutilizando a classe
import stokDrawImage from '../assets/stokDraw.png'; // Reutilizando a imagem

const CadastroPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        nome,
        email,
        password: senha,
      });

      if (response.status === 201) {
        alert('Cadastro realizado com sucesso!');
        navigate('/');  
      }
    } catch (err) {
      if (err.response && err.response.data.error === 'Email já cadastrado') {
        alert('Erro ao cadastrar: Email já cadastrado'); 
      } else {
        setError(err.response ? err.response.data.error : 'Erro inesperado ao tentar cadastrar');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="login-title">Cadastro</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} id="cadastroForm">
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="form-control"
              placeholder="Digite seu nome"
              required
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmarSenha" className="form-label">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirme sua senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill fs-5">
            Continuar
          </button>
          <p className="mt-3 text-center small">
            Já tem uma conta? <a href="/">Faça login aqui</a>
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

export default CadastroPage;
