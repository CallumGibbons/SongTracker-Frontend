import React from 'react';
import PropTypes from 'prop-types';
import './AlbumCard.css'; 

const AlbumCard = ({ album }) => {
    if (!album) {
        return <div>No album data available</div>;
    }

    return (
        <div className="album-card">
            <h3 className="album-name">{album.name}</h3>
            <p className="album-favourite">Favourite: {album.is_favourite ? 'Yes' : 'No'}</p>
            <p className="album-listens">Listens: {album.listens}</p>
            {album.artist && ( // Check if artist exists before accessing it
                <p className="album-artist">Artist: {album.artist.name}</p>
            )}
        </div>
    );
};

AlbumCard.propTypes = {
    album: PropTypes.shape({
        name: PropTypes.string,
        is_favourite: PropTypes.bool,
        listens: PropTypes.number,
        artist: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};

export default AlbumCard;
