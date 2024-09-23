import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import "./Upload.css";

const Upload = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview to the file's data URL
        setTextResult(""); // Clear previous text result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearAll = () => {
    setImagePreview(null); // Clear the image preview
    fileInputRef.current.value = null; // Reset the file input
    setTextResult(""); // Clear text result
  };

  const handleConvert = () => {
    if (!imagePreview) {
      alert("No image to convert!");
      return;
    }

    setIsConverting(true); // Show loading indicator

    // Use Tesseract.js to extract text from the image
    Tesseract.recognize(
      imagePreview,
      "eng", // Use English language (you can configure other languages)
      {
        logger: (m) => console.log(m), // Optional logger
      }
    )
      .then(({ data: { text } }) => {
        setTextResult(text); // Set the extracted text
        setIsConverting(false); // Hide loading indicator
      })
      .catch((error) => {
        console.error(error);
        setIsConverting(false); // Hide loading indicator
      });
  };

  const handleCopy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select(); // Select the text in the textarea
      document.execCommand("copy"); // Copy the selected text to clipboard
      alert("Text copied to clipboard!"); // Notify the user
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

      <div className="action-buttons">
        <button className="clear-button" onClick={handleClearAll}>
          Clear All
        </button>
        <button
          className="convert-button"
          onClick={handleConvert}
          disabled={isConverting}
        >
          {isConverting ? "Converting..." : "Convert"}
        </button>
      </div>

      {textResult && (
        <div className="text-result">
          <h4>Extracted Text:</h4>
          <textarea
            ref={textAreaRef}
            value={textResult}
            onChange={(e) => setTextResult(e.target.value)} // Allow editing
            rows={10}
            className="text-area"
          />
          <button className="copy-button" onClick={handleCopy}>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
