import React from 'react';
import './Playlist.css';
// import TrackList component

export class Playlist extends React.Component {
  render() {
    return (
      <div className='Playlist'>
        <input defaultValue={'New Playlist'} />
        {/* TrackList component */}
        <button className='Playlist-save'>SAVE TO SPOTIFY</button>
      </div>
    );
  }
};