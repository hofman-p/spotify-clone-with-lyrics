import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import { getSmallestAlbumImage } from './utils';
import useAuth from './useAuth';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID
});

function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancelRequest = false;

    async function searchTracks() {
      try {
        const res = await spotifyApi.searchTracks(search);
        if (cancelRequest) return;
        setSearchResults(res.body.tracks.items.map(track => {
          const smallestAlbumImage = getSmallestAlbumImage(track);
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url
          }
        }));
      } catch (e) {
        console.error(e);
      }
    }
    searchTracks();
    return () => (cancelRequest = true);
  }, [search, accessToken]);

  useEffect(() => {
    if (!playingTrack) return;
    async function getLyrics() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URI}/lyrics`, {
          params: {
            track: playingTrack.title,
            artist: playingTrack.artist
          }
        });
        setLyrics(res.data.lyrics);
      } catch (e) {
        console.error(e);
      }
    }
    getLyrics();
  }, [playingTrack]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  }

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs / Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
    </Container>
  )
};

export default Dashboard;