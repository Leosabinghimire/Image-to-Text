import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import "./Upload.css";

const Upload = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
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
        setImagePreview(reader.result);
        setTextResult("");
        setErrorMessage(""); // Clear any previous error
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearAll = () => {
    setImagePreview(null);
    fileInputRef.current.value = null;
    setTextResult("");
    setErrorMessage(""); // Clear error message when clearing
  };

  const handleConvert = () => {
    if (!imagePreview) {
      setErrorMessage("No image to convert!"); // Set error message
      return;
    }

    setIsConverting(true);
    setErrorMessage(""); // Clear error message

    Tesseract.recognize(imagePreview, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setTextResult(text);
        setIsConverting(false);
      })
      .catch((error) => {
        console.error(error);
        setIsConverting(false);
        setErrorMessage("Error occurred during conversion."); // Set error message on failure
      });
  };

  const handleCopy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      setErrorMessage(""); // Clear any error message when copying
    }
  };

  return (
    <div className="upload-area">
      <img src={imagePreview || "/"} alt="Upload" className="upload-icon" />
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
        onChange={handleFileChange}
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
      {isConverting && <div className="loader"></div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}{" "}
      {textResult && (
        <div className="text-result">
          <h4>Extracted Text:</h4>
          <textarea
            ref={textAreaRef}
            value={textResult}
            onChange={(e) => setTextResult(e.target.value)}
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
