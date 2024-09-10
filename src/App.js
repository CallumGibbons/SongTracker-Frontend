import React from 'react';
import AlbumCard from '../src/Components/AlbumCard';

const App = () => {
    // Example album ID
    const exampleAlbumId = 84;

    return (
        <div>
            <h1>Album Details</h1>
            <AlbumCard albumId={exampleAlbumId} />
        </div>
    );
};

export default App;
