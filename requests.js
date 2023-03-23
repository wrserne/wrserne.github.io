import axios from 'axios';

const baseURL = 'http://192.168.68.51/';
const tempProbeId = 'temp'; // Replace with your actual temperature probe ID
const phProbeId = 'pH'; // Replace with your actual pH probe ID

const api = axios.create({
  baseURL
});

// Function to get current temperature reading for a probe
export function getCurrentTemperatureReading() {
  const temperatureEndpoint = `/api/probes/${tempProbeId}/current_reading`;
  return api.get(temperatureEndpoint)
    .then(response => {
      return response.data.value;
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to get current pH reading for a probe
export function getCurrentPHReading() {
  const phEndpoint = `/api/phprobes/${phProbeId}/readings`;
  return api.get(phEndpoint)
    .then(response => {
      return response.data[0].value;
    })
    .catch(error => {
      console.error(error);
    });
}
