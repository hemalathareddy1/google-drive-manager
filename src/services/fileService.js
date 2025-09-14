// src/services/fileService.js
let files = [
  {
    id: 1,
    name: "Project Doc",
    author: "Ram",
    mimeType: "application/pdf",
    fileUrl: "",
  },
  {
    id: 2,
    name: "Team Meeting",
    author: "Madhu",
    mimeType: "video/mp4",
    fileUrl: "",
  },
  {
    id: 3,
    name: "Friendship Pic",
    author: "Hema",
    mimeType: "image/jpeg",
    fileUrl: "",
  },
];

export const fileService = {
  getFiles: async () => {
    return [...files];
  },

  addFile: async (file) => {
    const id = Date.now();
    const fileUrl = URL.createObjectURL(file);
    const newFile = {
      id,
      name: file.name,
      author: "You",
      mimeType: file.type,
      fileUrl,
    };
    files.unshift(newFile);
    return newFile;
  },

  deleteFile: async (fileId) => {
    files = files.filter((f) => f.id !== fileId);
    return fileId;
  },
};
