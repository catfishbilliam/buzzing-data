require('dotenv').config(); // Load the .env file
const express = require('express');
const fetch = require('node-fetch'); // Import fetch for Node.js
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('public'));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fetch USDA APHIS API key from .env
const apiKey = process.env.APHIS_API_KEY;

// API route to fetch state data from USDA APHIS
app.get('/api/state/:state', async (req, res) => {
  const state = req.params.state;
  const url = `https://api.aphis.usda.gov/some-endpoint?state=${state}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from USDA APHIS');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});