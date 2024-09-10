import React from "react";
import PropTypes from "prop-types";
import "./AlbumCard.css";

const AlbumCard = ({ album }) => {
  if (!album) {
    return <div>No album data available</div>;
  }

  return (
    <div className="album-card">
      <h3 className="album-name">{album.name}</h3>
      <p className="album-favourite">
        Favourite: {album.is_favourite ? "Yes" : "No"}
      </p>
      <p className="album-listens">Listens: {album.listens}</p>
      <p className="artist-name">Artist: {album.artist.name}</p>
    </div>
  );
};

AlbumCard.propTypes = {
  album: PropTypes.object.isRequired,
};

export default AlbumCard;
