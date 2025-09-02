import axios from 'axios';

const API = 'https://controle-de-estoque-projeto.onrender.com/pi/stock';

function auth() {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export const getStockEntries  = () => axios.get(`${API}/entries`, auth());
export const createStockEntry = (data) => axios.post(`${API}/entries`, data, auth());
export const updateStockEntry = (id, data) => axios.put(`${API}/entries/${id}`, data, auth());
export const deleteStockEntry = (id) => axios.delete(`${API}/entries/${id}`, auth());

export const getStockOutflows   = () => axios.get(`${API}/outflows`, auth());
export const createStockOutflow = (data) => axios.post(`${API}/outflows`, data, auth());
export const updateStockOutflow = (id, data) => axios.put(`${API}/outflows/${id}`, data, auth());
export const deleteStockOutflow = (id)       => axios.delete(`${API}/outflows/${id}`, auth());