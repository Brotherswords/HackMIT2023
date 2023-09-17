// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // replace with your API base URL if different
});

export const getPrediction = (content) => {
    return api.post('/tim/', content);
  };
export default api;

