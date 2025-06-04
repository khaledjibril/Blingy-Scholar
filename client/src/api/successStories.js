import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getSuccessStories = () => api.get('/success-stories').then(res => res.data);
export const createSuccessStory = (story) => api.post('/success-stories', story).then(res => res.data);
export const getSuccessStoryById = (id) =>api.get(`/success-stories/${id}`).then(res => res.data);
