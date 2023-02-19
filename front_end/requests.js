import axios from 'axios';

const baseURL = 'http://your-reef-pi-api-url/'; // this should be my rasberry pi IP on local network
const apiKey = 'your-reef-pi-api-key';

const api = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
});

//temperatur probe requests

// set the base URL of the reef-pi API
const reefPiApiBaseUrl = 'http://<your-reef-pi-ip-address>/api';

// set the ID of the temperature probe you want to read
const temperatureProbeId = '<your-temperature-probe-id>';

// set the endpoint to get the current temperature reading for the specified probe
const endpoint = `/api/probes/${temperatureProbeId}/current_reading`;

// make the GET request using Axios
axios.get(`${reefPiApiBaseUrl}${endpoint}`)
  .then(response => {
    // handle the response data
    console.log(`Current temperature reading for probe ${temperatureProbeId}: ${response.data.value}`);
  })
  .catch(error => {
    // handle errors
    console.error(error);
  });

//pH probe requests

// Replace 'http://192.168.1.100:8080' with the IP address and port number of your reef-pi instance.
const endpoint = 'http://192.168.1.100:8080/api/phprobes/1/readings';

axios.get(endpoint)
  .then(response => {
    // The response contains the pH readings as an array of objects.
    const phData = response.data;
    console.log(phData);
  })
  .catch(error => {
    console.error(error);
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