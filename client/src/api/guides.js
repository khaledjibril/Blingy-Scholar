import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

// Get all guides
export const getGuides = () => api.get('/blogs').then(res => res.data);

// Get a single guide by its ID (not type)
export const getGuideById = (id) => api.get(`/blogs/${id}`).then(res => res.data);

// Optional: If you're categorizing blogs by type
export const getGuidesByType = (type) => api.get(`/blogs/type/${type}`).then(res => res.data);
