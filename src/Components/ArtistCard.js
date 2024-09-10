import React from "react";
import PropTypes from "prop-types";
import "./ArtistCard.css";

const ArtistCard = ({ artist}) => {
  if (!artist) {
    return <div>No artist data available</div>;
  }

  return (
    <div className="artist-card">
      <h3 className="artist-name">{artist.name}</h3>
      <p className="artist-favourite">
        Favourite: {artist.is_favourite ? "Yes" : "No"}
      </p>
      <p className="artist-listens">Listens: {artist.listens}</p>
    </div>
  );
};

ArtistCard.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default ArtistCard;
