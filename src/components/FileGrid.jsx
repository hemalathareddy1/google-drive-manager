import React from "react";
import "./FileGrid.css";

function FileGrid({ files, selectedFileId, onSelectFile, onDelete }) {
  if (!files || files.length === 0) return <p style={{ marginTop: "20px" }}>No files found.</p>;

  return (
    <div className="file-grid">
      {files.map((file) => (
        <div
          key={file.id}
          className={`file-card ${selectedFileId === file.id ? "selected" : ""}`}
          onClick={() => onSelectFile(file.id)}
          style={{ padding: "20px", minHeight: "250px" }} // increased card size
        >
          {file.mimeType.startsWith("image/") ? (
            <img src={file.fileUrl} alt={file.name} style={{ height: "180px" }} />
          ) : file.mimeType.startsWith("video/") ? (
            <video src={file.fileUrl} controls style={{ height: "180px" }} />
          ) : file.mimeType.startsWith("audio/") ? (
            <audio src={file.fileUrl} controls />
          ) : (
            <p>{file.name}</p>
          )}

          <p className="file-name"><strong>{file.name}</strong></p>
          <p className="file-author">Author: {file.author || "Unknown"}</p>
          <p className="file-type">Type: {file.mimeType}</p>

          {/* Action buttons with spacing */}
          <div
            className="file-actions"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              gap: "10px", // space between buttons
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(file.fileUrl, "_blank");
              }}
            >
              View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement("a");
                link.href = file.fileUrl;
                link.download = file.name;
                link.click();
              }}
            >
              Download
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(file.id);
              }}
              style={{ color: "white", backgroundColor: "#e53e3e" }} // red delete button
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileGrid;
