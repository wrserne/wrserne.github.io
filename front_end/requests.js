import axios from 'axios';

const baseURL = 'http://your-reef-pi-api-url/';
const apiKey = 'your-reef-pi-api-key';

const api = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
});

// Temperature probe request
const temperatureProbeId = '<your-temperature-probe-id>';
const temperatureEndpoint = `/api/probes/${temperatureProbeId}/current_reading`;
api.get(temperatureEndpoint)
  .then(response => {
    console.log(`Current temperature reading for probe ${temperatureProbeId}: ${response.data.value}`);
  })
  .catch(error => {
    console.error(error);
  });

// pH probe request
const phEndpoint = '/api/phprobes/1/readings'; // Replace '1' with the ID of your pH probe
api.get(phEndpoint, { baseURL })
  .then(response => {
    const phData = response.data;
    console.log(phData);
  })
  .catch(error => {
    console.error(error);
  });

export default api;