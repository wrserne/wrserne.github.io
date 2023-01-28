import axios from 'axios';

const baseURL = 'http://your-reef-pi-api-url/';
const apiKey = 'your-reef-pi-api-key';

const api = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
});

export default {
  // pH Probes
  getAllPhProbes: () => api.get('/ph_probes'),
  getPhProbe: (id) => api.get(`/ph_probes/${id}`),
  createPhProbe: (data) => api.post('/ph_probes', data),
  updatePhProbe: (id, data) => api.put(`/ph_probes/${id}`, data),
  deletePhProbe: (id) => api.delete(`/ph_probes/${id}`),

  // Temperature
  getAllTemperatureProbes: () => api.get('/temperature_probes'),
  getTemperatureProbe: (id) => api.get(`/temperature_probes/${id}`),
  createTemperatureProbe: (data) => api.post('/temperature_probes', data),
  updateTemperatureProbe: (id, data) => api.put(`/temperature_probes/${id}`, data),
  deleteTemperatureProbe: (id) => api.delete(`/temperature_probes/${id}`),
  getCurrentTemperatureReading: (id) => api.get(`/temperature_probes/${id}/current_reading`),
  
  // General
  login: (data) => api.post('/auth/signin', data)
};