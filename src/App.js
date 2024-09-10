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
  const [sortType, setSortType] = useState("default"); // Track the sorting type
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

  // Sort the data based on the selected sort type
  const sortData = (data) => {
    switch (sortType) {
      case "alphabetical":
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      case "listens":
        return [...data].sort((a, b) => b.listens - a.listens);
      case "default":
      default:
        return data;
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(sortData(data).length / itemsPerPage);

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortData(data).slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

      {/* Dropdown for sorting */}
      <div className="sort-dropdown">
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="listens">Number of Listens</option>
        </select>
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
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          &laquo; Previous
        </button>
        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default App;
