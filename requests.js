const request = require('request');

// Replace the following variables with your own values
const REEF_PI_IP_ADDRESS = '192.168.68.61';
const REEF_PI_PORT = '8080';
const USERNAME = 'reef-pi';
const PASSWORD = 'reef-pi';

// Generate the digest hash using the password and the session ID
function generateDigest(password, sessionId) {
  const hmac = require('crypto').createHmac('sha256', password);
  hmac.update(sessionId);
  return hmac.digest('hex');
}

// Authenticate with Reef-pi and retrieve the session ID and API key
function authenticateWithReefPi(callback) {
  // Send a GET request to the login endpoint to retrieve the session ID
  const loginUrl = `http://${REEF_PI_IP_ADDRESS}:${REEF_PI_PORT}/login`;
  request.get(loginUrl, (error, response) => {
    if (error) {
      return callback(error);
    }

    // Extract the session ID from the response
    const sessionId = response.headers['set-cookie'][0].split(';')[0].split('=')[1];

    // Generate the digest hash using the password and the session ID
    const digest = generateDigest(PASSWORD, sessionId);

    // Send a POST request to the login endpoint with the digest hash
    const postData = { username: USERNAME, password: digest };
    const options = {
      url: loginUrl,
      json: true,
      headers: { 'X-Api-Key': digest },
      body: postData,
    };
    request.post(options, (error, response) => {
      if (error) {
        return callback(error);
      }

      // Return the session ID and API key in the callback
      const sessionId = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
      const apiKey = response.headers['x-api-key'];
      callback(null, { sessionId, apiKey });
    });
  });
}

// Get the current temperature reading from a probe
function getCurrentTemperature(sessionId, apiKey, probeName, callback) {
  const url = `http://${REEF_PI_IP_ADDRESS}:${REEF_PI_PORT}/api/tc/${probeName}`;
  const headers = { 'X-Session-ID': sessionId, 'X-API-Key': apiKey };
  request.get({ url, headers, json: true }, (error, response, body) => {
    if (error) {
      return callback(error);
    }
    callback(null, body.current);
  });
}

// Get the current pH reading from a probe
function getCurrentPH(sessionId, apiKey, probeName, callback) {
  const url = `http://${REEF_PI_IP_ADDRESS}:${REEF_PI_PORT}/api/ph/${probeName}`;
  const headers = { 'X-Session-ID': sessionId, 'X-API-Key': apiKey };
  request.get({ url, headers, json: true }, (error, response, body) => {
    if (error) {
      return callback(error);
    }
    callback(null, body.current);
  });
}

// Example usage:
authenticateWithReefPi((error, { sessionId, apiKey }) => {
  if (error) {
    console.error('Failed to authenticate with Reef-pi:', error);
    return;
  }

  // Get the current temperature reading from a probe named "Temp Probe 1"
  getCurrentTemperature(sessionId, apiKey, 'Temp Probe 1', (error, temperature) => {
    if (error) {
      console.error('Failed to get current temperature:', error);
      return;
    }
    console.log('Current temperature:', temperature);
  })})

