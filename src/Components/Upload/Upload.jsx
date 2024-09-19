import React, { useState, useRef } from "react";
import "./Upload.css";

const Upload = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview to the file's data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="upload-area">
      <img
        src={imagePreview || "/"} // Use imagePreview if available, otherwise a default src
        alt="Upload"
        className="upload-icon"
      />
      <h3>Drop, Upload or Paste image</h3>
      <p>Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF</p>
      <button className="browse-button" onClick={handleBrowseClick}>
        Browse
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".jpg, .jpeg, .png, .gif, .jfif, .heic, .pdf"
        onChange={handleFileChange} // Handle file selection
      />
      <button className="paste-button">
        <img src="/" alt="Paste" />
      </button>
    </div>
  );
};

export default Upload;
