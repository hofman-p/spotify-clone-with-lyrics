import { useState, useEffect } from 'react';
import axios from 'axios';

function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    if (!code) return;

    async function login() {
      try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URI || 'http://localhost:3001'}/login`, {
          code
        });
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // Clear the URL parameters after successful login
        window.history.pushState({}, null, "/");
      } catch (e) {
        console.error('Login failed:', e);
      }
    }
    login();
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    try {
      const interval = setInterval(async () => {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URI || 'http://localhost:3001'}/refreshToken`, {
          refreshToken
        });
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
      }, (expiresIn - 60) * 1000); // refresh accessToken 1 min before expiration
      return () => clearInterval(interval);
    } catch (e) {
      window.location = '/';
    }
  }, [refreshToken, expiresIn]);

  return accessToken;
}

export default useAuth;