import React, { useState, useEffect } from 'react';

const track = {
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

function WebPlayback(props) {

    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [is_active, setActive] = useState(false); 
    const [current_track, setTrack] = useState(track);

    let token = window.localStorage.getItem('token');

    useEffect(() => {

        const playTrack = (player, trackId, device_id) => {
            fetch("https://api.spotify.com/v1/me/player/play?device_id=" + device_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ uris: [`spotify:track:${trackId}`] })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };

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

                playTrack(player, "7ovUcF5uHTBRzUpB6ZOmvt", device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.connect();

            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then(state => { 
                    (!state)? setActive(false) : setActive(true);
                });
            }));            
        };
    }, [token]);

    return (
      <>
        <div className="container">
           <div className="main-wrapper">
                <h1>WebPlayback</h1>
                <img src={current_track.album.images[0]?.url || ""} 
                     className="now-playing__cover" alt="" />

                <div className="now-playing__side">
                    <div className="now-playing__name">{current_track.name}</div>
                    <div className="now-playing__artist">{current_track.artists[0]?.name || ""}</div>
                </div>
                <button className="btn-spotify" onClick={() => { player?.previousTrack() }} >
                    &lt;&lt;
                </button>

                <button className="btn-spotify" onClick={() => { player?.togglePlay() }} >
                    { is_paused ? "PLAY" : "PAUSE" }
                </button>

                <button className="btn-spotify" onClick={() => { player?.nextTrack() }} >
                    &gt;&gt;
                </button>
            </div>
        </div>
      </>
    );
}

export default WebPlayback;
