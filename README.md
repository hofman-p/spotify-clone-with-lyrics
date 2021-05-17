# spotify-clone-with-lyrics
Spotify clone with automatic lyrics, Spotify premium login (+ refresh token) using React

## Features
* Spotify login (and auto refresh token)
* Track listing by artist or name
* Lyrics displayed when playing track
* Basic Spotify playback bar is implemented

## What you need first
You need to have installed or own:
* Node.js
* Spotify premium account

## How to start
### Spotify developer account
**If you have a Spotify developer account, you can skip this part**
1. Login to https://developer.spotify.com
2. Create an app (enter name, description, accept rules...)
3. Go to "Edit Settings" and in "Redirect URIs", add "http://localhost:3000", then save
4. Note somewhere your Client ID and Client Secret from your dashboard

### Configure project
1. With the help of your terminal, go to `server` folder
2. Type `npm i` to install all modules
3. Create a `.env` file and write:
```
SPOTIFY_CLIENT_ID=replacethisbyyourclientid
SPOTIFY_CLIENT_SECRET=replacethisbyyourclientsecret
SPOTIFY_REDIRECT_URI=http://localhost:3000
```
4. Save then type `npm run dev` in your terminal
5. Open a new terminal tab, go to `client` folder
6. Type `npm i` to install all modules
7. Create a `.env` file and write:
```
REACT_APP_SPOTIFY_CLIENT_ID=replacebyyourclientid
REACT_APP_SERVER_URI=http://localhost:3001
```
8. Save then type `npm start` in your terminal
9. Visit `http://localhost:3000` to go on login page
