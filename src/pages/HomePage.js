import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HomePage.css'; // Assuming you have separate CSS for the homepage
import tim from '../assets/tim_logo.jpeg'

function HomePage({ setToken, token }) {
  const navigate = useNavigate();

  const CLIENT_ID = "b03a524109544e15ba71c3896c899e2b"; //REPLACE THIS BEFORE DEPLOYMENT
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  var SCOPE = "streaming \
               user-read-email \
               user-read-private"

  useEffect(() => {
    if (token) {
      navigate('/select-book');
    }
  }, [token, navigate]);

  return (
    <div className="Homepage">
      <header className="App-header">
      <div>
      <img src={tim} alt="Tim Logo" style={{ width: '100px', height: '100px' }} />

    </div>
        <a 
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} 
          className="login-button"
        >
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default HomePage;

//curl -X "POST" -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=client_credentials" "https://accounts.spotify.com/api/token" --user "b03a524109544e15ba71c3896c899e2b:d49e4672dcfd4b868d8f2adda0aec41e"
//curl -X "GET" "https://api.spotify.com/v1/tracks/7rQbD5N1rGu7E36rpPJOw5" -H "Authorization: Bearer BQB7-NeTMKnrGIN3GaQkpjXsH9AEvsOcmEdIVs1bKy-H3lBViVbymRawIJsnKTnSAHhLTEOqhYP3NY2ha7ugJSaGuNkCvHC1StBSBvwVQ_B_C_zI0fw"
