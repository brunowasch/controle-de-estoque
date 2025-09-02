import axios from 'axios';

const API_URL = 'https://controle-de-estoque-projeto.onrender.com/api/products';

function auth(){
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export const getProducts = () => axios.get(API_URL, auth());
export const getProductById = (id) => axios.get(`${API_URL}/${id}`, auth());
export const createProduct = (data) => axios.post(API_URL, data, auth());
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data, auth());
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`, auth());
