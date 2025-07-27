import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// https://github.com/thelinmichael/spotify-web-api-node Authorization -> login
app.post('/login', async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    console.log('Attempting login with code:', code.substring(0, 10) + '...');
    console.log('Using redirect URI:', process.env.SPOTIFY_REDIRECT_URI);
    console.log('Using client ID:', process.env.SPOTIFY_CLIENT_ID);

    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    const tokens = await spotifyApi.authorizationCodeGrant(code);
    console.log('Login successful');
    res.json({
      accessToken: tokens.body.access_token,
      refreshToken: tokens.body.refresh_token,
      expiresIn: tokens.body.expires_in,
    });
  } catch (e) {
    console.error('Login error:', e.message);
    console.error('Error body:', e.body);
    res.status(e.statusCode || 500).json({
      error: 'Authentication failed. Please try again.',
    });
  }
});

// https://github.com/thelinmichael/spotify-web-api-node Authorization -> refreshToken
app.post('/refreshToken', async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      refreshToken,
    });
    const data = await spotifyApi.refreshAccessToken();
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in,
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(e.statusCode);
  }
});

// Using LyricsOVH API - free and no API key required
app.get('/lyrics', async (req, res) => {
  try {
    const { artist, track } = req.query;

    if (!artist || !track) {
      return res
        .status(400)
        .json({ error: 'Artist and track parameters are required' });
    }

    // Clean up artist and track names for better API results
    const cleanArtist = encodeURIComponent(artist.trim());
    const cleanTrack = encodeURIComponent(track.trim());

    const response = await fetch(
      `https://api.lyrics.ovh/v1/${cleanArtist}/${cleanTrack}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return res.json({ lyrics: 'No Lyrics Found' });
      }
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.json({ lyrics: data.lyrics || 'No Lyrics Found' });
  } catch (e) {
    console.error('Lyrics API Error:', e);
    res.json({ lyrics: 'No Lyrics Found' });
  }
});

app.listen(3001);
