import React from "react";
import "./FileGrid.css";

function FileGrid({ files, selectedFileId, onSelectFile }) {
  if (!files || files.length === 0) {
    return <p style={{ marginTop: "20px" }}>No files found.</p>;
  }

  return (
    <div className="file-grid">
      {files.map((file) => (
        <div
          key={file.id}
          className={`file-card ${selectedFileId === file.id ? "selected" : ""}`}
          onClick={() => onSelectFile(file.id)}
        >
          {file.mimeType.startsWith("image/") ? (
            <img src={`https://drive.google.com/uc?id=${file.id}`} alt={file.name} />
          ) : file.mimeType.startsWith("video/") ? (
            <video src={`https://drive.google.com/uc?id=${file.id}`} controls />
          ) : file.mimeType.startsWith("audio/") ? (
            <audio src={`https://drive.google.com/uc?id=${file.id}`} controls />
          ) : (
            <a
              href={`https://drive.google.com/uc?id=${file.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {file.name}
            </a>
          )}

          <p className="file-name"><strong>{file.name}</strong></p>
          <p className="file-author">Author: {file.author || "Unknown"}</p>
          <p className="file-type">Type: {file.mimeType}</p>
        </div>
      ))}
    </div>
  );
}

export default FileGrid;
