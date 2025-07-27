import { useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  // Clean up URL parameters after extracting the code
  useEffect(() => {
    if (code) {
      // Remove the code from URL to prevent reuse
      const url = new URL(window.location);
      url.searchParams.delete('code');
      url.searchParams.delete('state');
      window.history.replaceState({}, document.title, url.pathname);
    }
  }, [code]);

  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
