import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/userService';
import '../css/style.css';
import stokDrawImage from '../assets/stokDraw.png';

const CadastroPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register({ nome, email, password: senha });

      if (response.status === 201) {
        alert('Cadastro realizado com sucesso!');
        navigate('/'); 
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erro inesperado ao tentar cadastrar';
      setError(errorMsg);
    }
  };

  // Limpa erro depois de 3 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card shadow flex-column flex-md-row w-100 mx-auto"
        style={{ maxWidth: '850px' }}
      >
        <div className="col-md-6 p-5 align-content-center">
          <p className="mb-4 fs-4 text-center">Cadastre-se</p>

          <form id="cadastroForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="form-control"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="password"
                className="form-control"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {error && (
              <div className="alert alert-danger text-center py-1 my-2 small">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fs-5 mt-1"
            >
              Concluir
            </button>
            <p className="mt-3 text-center small">
              Já tem uma conta? <a href="/">Entre aqui</a>
            </p>
          </form>
        </div>

        {/* Lado direito - imagem e texto */}
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

export default CadastroPage;
