import axios from 'axios';

const API_URL = 'http://localhost:3000/api/suppliers';

export const getSuppliers = () => axios.get(API_URL);
export const getSupplierById = (id) => axios.get(`${API_URL}/${id}`);
export const createSupplier = (data) => axios.post(API_URL, data);
export const updateSupplier = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteSupplier = (id) => axios.delete(`${API_URL}/${id}`);
