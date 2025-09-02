import axios from 'axios';

const API_URL = 'https://controle-de-estoque-projeto.onrender.com//api/auth';

export const login = (data) => axios.post(`${API_URL}/login`, data);

export const register = (data) => axios.post(`${API_URL}/register`, data);
