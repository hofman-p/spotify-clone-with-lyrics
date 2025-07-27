# Spotify Clone with Lyrics

A full-stack Spotify clone application built with React and Node.js that allows users to search for music, play tracks, and view lyrics in real-time.
This project was actually built BEFORE lyrics were added to Spotify!

## ✨ Features

- 🎵 **Spotify Authentication** - Secure login with Spotify OAuth
- 🔍 **Music Search** - Search for tracks, artists, and albums
- ▶️ **Music Playback** - Stream music directly using Spotify Web Playback SDK
- 📝 **Automatic Lyrics** - Real-time lyrics display using LyricsOVH API
- 🔄 **Auto Token Refresh** - Seamless session management
- 🎨 **Responsive Design** - Mobile-friendly UI with Bootstrap
- 🎼 **Playback Controls** - Play, pause, skip tracks

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite build tool
- **Bootstrap 5** for responsive UI
- **Axios** for HTTP requests
- **Spotify Web API SDK** for music integration

### Backend
- **Node.js** with Express server
- **Spotify Web API** for authentication and music data
- **LyricsOVH API** for lyrics fetching
- **CORS** enabled for cross-origin requests

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **Spotify Premium Account** (required for playback)
- **Spotify Developer Account** for API access

## 🚀 Getting Started

### 1. Spotify Developer Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app (provide name, description, accept terms)
3. In **Edit Settings**, add `http://localhost:3000` to **Redirect URIs**
4. Save your **Client ID** and **Client Secret**

### 2. Server Configuration

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Spotify credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id_here
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
   SPOTIFY_REDIRECT_URI=http://localhost:3000
   ```

4. Start the server:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3001`

### 3. Client Configuration

1. Open a new terminal and navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
   VITE_SERVER_URI=http://localhost:3001
   VITE_REDIRECT_URI=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:3000`

## 🎯 Usage

1. **Open** your browser and visit `http://localhost:3000`
2. **Click** "Login with Spotify" to authenticate
3. **Search** for your favorite songs using the search bar
4. **Click** on any track to start playback and view lyrics
5. **Enjoy** your music with synchronized lyrics display!

## 📁 Project Structure

```
spotify-clone-with-lyrics/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx        # Main app component
│   │   ├── Login.jsx      # Spotify authentication
│   │   ├── Dashboard.jsx  # Search and track listing
│   │   ├── Player.jsx     # Music player component
│   │   ├── useAuth.jsx    # Authentication hook
│   │   └── utils.js       # Helper functions
│   ├── .env               # Client environment variables
│   └── package.json
├── server/                # Node.js backend
│   ├── server.js          # Express server
│   ├── .env               # Server environment variables
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

- `POST /login` - Exchange authorization code for access tokens
- `POST /refreshToken` - Refresh expired access tokens
- `GET /lyrics` - Fetch song lyrics by artist and track name

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data and playback
- [LyricsOVH API](https://lyricsovh.docs.apiary.io/) for free lyrics service
- [React Spotify Web Playback](https://github.com/gilbarbara/react-spotify-web-playback) for audio integration
