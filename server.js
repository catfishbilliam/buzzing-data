import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';  // For making API requests to the USDA API

const app = express();

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch USDA data based on the user's state selection
app.get('/api/state/:state', async (req, res) => {
    const apiKey = process.env.API_KEY;  // USDA API Key from .env file
    const state = req.params.state;  // Extract state name from the URL parameter

    // USDA Quick Stats API request with static filters and dynamic state name
    const url = `https://quickstats.nass.usda.gov/api/api_GET/?key=${apiKey}&program=SURVEY&sector=ANIMALS%20%26%20PRODUCTS&group=SPECIALTY&commodity=HONEY&category=LOSS,COLONY%20COLLAPSE%20DISORDER&year=2023&agg_level_desc=STATE&state_name=${state}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);  // Send the data back to the client
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
