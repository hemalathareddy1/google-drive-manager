import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import FileGrid from "./components/FileGrid";
import SearchBar from "./components/SearchBar";
import {
  authenticate,
  initClient,
  listFiles,
  uploadFile,
  deleteFile,
} from "./services/googleDriveAPI";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await initClient();
        await authenticate();
        const data = await listFiles();
        setFiles(data);
        setFilteredFiles(data);
      } catch (err) {
        console.error("Initialization error:", err);
        setError(err.message || "Initialization failed");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Handle file search when button is clicked
  const handleSearchClick = () => {
    const q = (searchQuery || "").toLowerCase();
    const filtered = files.filter(
      (file) =>
        (file.name || "").toLowerCase().includes(q) ||
        (file.author || "").toLowerCase().includes(q)
    );
    setFilteredFiles(filtered);
  };

  const handleUpload = async (event) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    setLoading(true);
    try {
      for (let file of uploadedFiles) {
        await uploadFile(file);
      }
      const data = await listFiles();
      setFiles(data);
      setFilteredFiles(data);
    } catch (err) {
      console.error("Upload error:", err);
      setError("File upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedFileId) {
      alert("Please select a file to delete.");
      return;
    }
    setLoading(true);
    try {
      await deleteFile(selectedFileId);
      const data = await listFiles();
      setFiles(data);
      setFilteredFiles(data);
      setSelectedFileId(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError("File deletion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Dashboard />

      <SearchBar
        query={searchQuery}
        setQuery={setSearchQuery}
        onSearchClick={handleSearchClick}
      />

      <div className="buttons">
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          onChange={handleUpload}
          multiple
        />
        <button onClick={() => document.getElementById("fileUpload").click()}>
          Upload File
        </button>
        <button onClick={handleDelete}>Delete File</button>
      </div>

      {loading && <div className="spinner">Loading files</div>}
      {error && <div className="status error">Error: {error}</div>}

      <FileGrid
        files={filteredFiles}
        selectedFileId={selectedFileId}
        onSelectFile={setSelectedFileId}
      />
    </div>
  );
}

export default App;
