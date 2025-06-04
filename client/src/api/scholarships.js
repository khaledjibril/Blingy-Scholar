import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getScholarships = () => api.get('/scholarships').then(res => res.data);
export const getScholarshipById = (id) => api.get(`/scholarships/${id}`).then(res => res.data);
