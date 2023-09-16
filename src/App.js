import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import SelectBook from './pages/SelectBook';

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let tokenFromStorage = window.localStorage.getItem("token");

    if (!tokenFromStorage && hash) {
      tokenFromStorage = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", tokenFromStorage);
    }

    setToken(tokenFromStorage);

  }, []);

  return (
    <div className="App">
      {!token ? (
        <HomePage setToken={setToken} />
      ) : (
        <SelectBook />
      )}
    </div>
  );
}

export default App;
