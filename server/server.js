require('dotenv').config();
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(express.json())

// https://github.com/thelinmichael/spotify-web-api-node Authorization -> login
app.post('/login', async (req, res) => {
  try {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    });
    const tokens = await spotifyApi.authorizationCodeGrant(code);
    res.json({
      accessToken: tokens.body.access_token,
      refreshToken: tokens.body.refresh_token,
      expiresIn: tokens.body.expires_in
    })
  } catch (e) {
    console.error(e);
    res.sendStatus(e.statusCode);
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
      refreshToken
    });
    const data = await spotifyApi.refreshAccessToken();
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(e.statusCode);
  }
});

app.listen(3001);