import axios from 'axios';

const API_URL = 'https://controle-de-estoque-projeto.onrender.com/api/suppliers';

function auth() {
  const token = localStorage.getItem('token'); 
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export const getSuppliers    = () => axios.get(API_URL, auth());
export const getSupplierById = (id) => axios.get(`${API_URL}/${id}`, auth());
export const createSupplier  = (data) => axios.post(API_URL, data, auth());
export const updateSupplier  = (id, data) => axios.put(`${API_URL}/${id}`, data, auth());
export const deleteSupplier  = (id) => axios.delete(`${API_URL}/${id}`, auth());