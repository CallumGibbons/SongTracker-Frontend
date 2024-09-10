import React from "react";
import PropTypes from "prop-types";
import "./SongCard.css";

const SongCard = ({ song }) => {
  if (!song) {
    return <div>No song data available</div>;
  }

  console.log(song);  // Check if artist data is available

  return (
    <div className="song-card">
      <h3 className="song-name">{song.name}</h3>
      <p className="song-favourite">
        Favourite: {song.is_favourite ? "Yes" : "No"}
      </p>
      <p className="song-listens">Listens: {song.listens}</p>
      {song.album && (
        <p className="album-name">Album: {song.album.name}</p>
      )}
      {song.album && (
        <p className="artist-name">Artist: {song.album.artist.name}</p>
      )}
    </div>
  );
};

SongCard.propTypes = {
  song: PropTypes.shape({
    name: PropTypes.string.isRequired,
    is_favourite: PropTypes.bool.isRequired,
    listens: PropTypes.number.isRequired,
    album: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default SongCard;
