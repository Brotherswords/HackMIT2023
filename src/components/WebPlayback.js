import React, { useState, useEffect } from 'react';
import '../css/Webplayer.css'; // Assuming you have separate CSS for the homepage
import 'font-awesome/css/font-awesome.min.css';

const defaultTrack = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
};

function WebPlayback({ trackId }) {
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [, setActive] = useState(false);
    const [current_track, setTrack] = useState(defaultTrack);
    const [deviceId, setDeviceId] = useState(null);

    let token = window.localStorage.getItem('token');

    const controlPlayback = (player, endpoint, method = 'PUT', body = null) => {
        fetch(`https://api.spotify.com/v1/me/player/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body && JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const playTrack = (player, trackId, device_id) => {
        if(trackId != null){
            controlPlayback(player, `play?device_id=${device_id}`, 'PUT', { uris: [`spotify:track:${trackId}`] });
        }
    };

    const pauseTrack = (player) => {
        controlPlayback(player, 'pause', 'PUT');
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id);  
                playTrack(player, trackId, device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.connect();

            player.addListener('player_state_changed', (state) => {
                console.log('player_state_changed', state);
                if (state && state.track_window.current_track) {
                    setTrack(state.track_window.current_track);
                }
                if (state) {
                    setPaused(state.paused);
                }

                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true);
                });
            });
        };
    }, [token, trackId]);

    return (
        <div className="music-bar">
            <div className="music-info">
                <img src={current_track.album?.images[0]?.url || ""} className="music-icon" alt="music icon" />
                <span className="music-name">{current_track.name || ""}</span>
            </div>
            <div className="music-control">
                <button className="control-button" onClick={() => is_paused ? playTrack(player, current_track.id, deviceId) : pauseTrack(player)}>
                    { is_paused ? <i className="fa fa-play"></i> : <i className="fa fa-pause"></i> }
                </button>
            </div>
        </div>
    );
}

export default WebPlayback;
