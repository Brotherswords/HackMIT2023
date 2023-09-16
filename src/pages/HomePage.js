import React from 'react';
import '../css/HomePage.css';//Assuming you have separate CSS for the homepage

function HomePage({ setToken }) {
  const CLIENT_ID = "b03a524109544e15ba71c3896c899e2b";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <div className="Homepage">
      <header className="App-header">
        <h1>TiM</h1>
        <a 
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} 
          className="login-button"
        >
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default HomePage;
