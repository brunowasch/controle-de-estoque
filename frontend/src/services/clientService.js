import axios from 'axios';

const API_URL = 'http://localhost:3000/api/clients'; 

export const getClients = () => axios.get(API_URL);
export const getClientById = (id) => axios.get(`${API_URL}/${id}`);
export const createClient = (data) => axios.post(API_URL, data);
export const updateClient = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteClient = (id) => axios.delete(`${API_URL}/${id}`);