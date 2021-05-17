import { useState, useEffect } from 'react';
import axios from 'axios';

function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    async function login() {
      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URI}/login`, {
          code
        });
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      } catch (e) {
        window.location = '/';
      }
    }
    login();
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    try {
      const interval = setInterval(async () => {
        console.log('hello refresh');
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URI}/refreshToken`, {
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
};


export default useAuth;