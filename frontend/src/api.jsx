import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const login = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
export const register = (user) => axios.post(`${API_URL}/auth/register`, user);
export const createTicket = (ticket) => axios.post(`${API_URL}/tickets/create`, ticket, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const getMyTickets = () => axios.get(`${API_URL}/tickets/my-tickets`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
