import "./SearchBar.css";

function SearchBar({ query, setQuery, onSearchClick, onResetClick }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Search by name or author..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-btn" onClick={onSearchClick}>
        Search
      </button>
      <button
        className="search-btn"
        style={{ backgroundColor: "#718096" }}
        onClick={onResetClick}
      >
        Reset
      </button>
    </div>
  );
}

export default SearchBar;

