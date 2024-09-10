import React, { useState, useEffect } from 'react';
import AlbumCard from '../src/Components/AlbumCard';

const App = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch('http://localhost:8080/albums'); // Fetch all albums
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAlbums(data); // Set the albums data in state
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    if (loading) {
        return <div>Loading albums...</div>;
    }

    if (error) {
        return <div>Error fetching albums: {error.message}</div>;
    }

    return (
        <div>
            <h1>Album List</h1>
            <div className="album-list">
                {albums.length > 0 ? (
                    albums.map((album) => (
                        <AlbumCard key={album.id} album={album} /> // Pass each album as prop
                    ))
                ) : (
                    <div>No albums available</div>
                )}
            </div>
        </div>
    );
};

export default App;
