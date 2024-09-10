import React, { useState, useEffect } from "react";
import AlbumCard from "./Components/AlbumCard";
import ArtistCard from "./Components/ArtistCard";
import SongCard from "./Components/SongCard";
import "./App.css"

const App = () => {
  const [activeSection, setActiveSection] = useState("albums");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 50; // Number of items to display per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        switch (activeSection) {
          case "albums":
            response = await fetch("http://localhost:8080/albums");
            break;
          case "artists":
            response = await fetch("http://localhost:8080/artists");
            break;
          case "songs":
            response = await fetch("http://localhost:8080/songs");
            break;
          default:
            return;
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result); // Set the fetched data in state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSection]);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div>
      <h1>Music Database</h1>

      {/* Buttons to switch between sections */}
      <div className="button-group">
        <button onClick={() => setActiveSection("albums")}>Albums</button>
        <button onClick={() => setActiveSection("artists")}>Artists</button>
        <button onClick={() => setActiveSection("songs")}>Songs</button>
      </div>

      {/* Conditional Rendering of Cards Based on Active Section */}
      <div className="data-list">
        {activeSection === "albums" &&
          currentData.map((album) => <AlbumCard key={album.album_id} album={album} />)}

        {activeSection === "artists" &&
          currentData.map((artist) => <ArtistCard key={artist.artist_id} artist={artist} />)}

        {activeSection === "songs" &&
          currentData.map((song) => <SongCard key={song.song_id} song={song} />)}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
