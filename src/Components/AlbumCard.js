import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AlbumCard.css";

const AlbumCard = ({ albumId }) => {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`http://localhost:8080/albums/${albumId}`); // Use albumId in the URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAlbum(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching album data: {error.message}</div>;
  }

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
    </div>
  );
};

AlbumCard.propTypes = {
  albumId: PropTypes.number.isRequired,
};

export default AlbumCard;
