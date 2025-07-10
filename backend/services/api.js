import axios from 'axios';

// Criação da instância do Axios para centralizar configurações de API
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Defina a URL base do seu backend
});

// Adicionando o token JWT ao cabeçalho (caso exista no localStorage)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
