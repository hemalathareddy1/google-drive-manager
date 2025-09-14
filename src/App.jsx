import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import FileGrid from "./components/FileGrid";
import SearchBar from "./components/SearchBar";
import { fileService } from "./services/fileService";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadFiles = async () => {
      const data = await fileService.getFiles();
      setFiles(data);
      setFilteredFiles(data);
    };
    loadFiles();
  }, []);

  // Search
  const handleSearchClick = () => {
    const q = (searchQuery || "").toLowerCase();
    const filtered = files.filter(
      (file) =>
        (file.name || "").toLowerCase().includes(q) ||
        (file.author || "").toLowerCase().includes(q)
    );
    setFilteredFiles(filtered);
  };

  // Reset search
  const handleResetClick = () => {
    setSearchQuery("");
    setFilteredFiles(files);
  };

  // Upload
  const handleUpload = async (event) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    for (let file of uploadedFiles) {
      const newFile = await fileService.addFile(file);
      setFiles((prev) => [newFile, ...prev]);
      setFilteredFiles((prev) => [newFile, ...prev]);
    }
  };

  // Delete
  const handleDelete = async (fileId) => {
    if (!fileId) {
      alert("Please select a file to delete.");
      return;
    }
    await fileService.deleteFile(fileId);
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    setFilteredFiles((prev) => prev.filter((f) => f.id !== fileId));
    setSelectedFileId(null);
  };

  return (
    <div className="app-container">
      <Dashboard />

      <SearchBar
        query={searchQuery}
        setQuery={setSearchQuery}
        onSearchClick={handleSearchClick}
        onResetClick={handleResetClick}
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
        <button onClick={() => handleDelete(selectedFileId)}>Delete File</button>
      </div>

      <FileGrid
        files={filteredFiles}
        selectedFileId={selectedFileId}
        onSelectFile={setSelectedFileId}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
