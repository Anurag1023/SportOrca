import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config({ path: 'src/.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors(corsOptions));
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

app.get('/api/short-matches', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.soccerdataapi.com/match-previews-upcoming/?auth_token=${process.env.API_KEY}`
    );
    const results = response.data.results || response.data;

    let matches = [];
    for (const league of results) {
      if (league.match_previews && Array.isArray(league.match_previews)) {
        for (const match of league.match_previews) {
          matches.push({
            competition: league.league_name || '',
            home_team: match.teams?.home?.name || '',
            away_team: match.teams?.away?.name || '',
            date: match.date || '',
            time: match.time || ''
          });
        }
      }
    }

    res.json(matches.slice(0, 9));
  } catch (error) {
    console.error('Error extracting match data:', error);
    res.status(500).json({ error: 'Failed to extract match data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
