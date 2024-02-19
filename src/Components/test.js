import React, { useState } from "react";
import "../Styles/test.css";
import { useNavigate } from "react-router-dom";
import RecordAudioComponent from "./RecordAudioComponent"; // Import the RecordAudioComponent

const Test = () => {
  // State for the selected audio file
  const [audioFile, setAudioFile] = useState(null);
  // State for the URL of the selected audio file
  const [audioUrl, setAudioUrl] = useState(null);
  // State for the predicted emotion
  const [emotion, setEmotion] = useState(null);
  // Navigation hook
  const navigate = useNavigate();

  // Event handler for file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    const url = URL.createObjectURL(file);
    console.log("New audio URL:", url); // Add this line to check the new audio URL
    setAudioUrl(url); // Set the URL of the selected audio file
  };

  // Event handler for uploading and predicting emotion
  const handleUpload = async () => {
    try {
      // Create FormData and append the selected audio file
      const formData = new FormData();
      formData.append("file", audioFile);

      // Make a POST request to the prediction API
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      // If the response is successful, extract and set the predicted emotion
      if (response.ok) {
        const result = await response.json();
        setEmotion(String(result.emotion));
      } else {
        console.error("Error uploading audio file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Event handler for user logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    console.log("Logout clicked");
  };

  // Function to display emotion with corresponding emoji
  const getEmotionWithEmoji = (emotion) => {
    const emojiMap = {
      angry: "😡",
      fear: "😱",
      disgust: "🤢",
      surprise: "😲",
      calm: "😌",
      happy: "😄",
      sad: "😢",
      neutral: "😐",
    };
    return (
      <>
        <strong>{emotion}</strong>
        <br />
        {emojiMap[emotion]}
      </>
    );
  };

  const backgroundImageStyle = {
    backgroundImage: "url('back.jpg')", // Adjusted URL with quotes and fixed the path
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: -1, // Ensure background is behind other elements
  };

  return (
    <div style={backgroundImageStyle}>
      <div
        className="form-container"
        style={{ position: "relative", left: "600px", top: "50px" }}
      >
        {/* File input for selecting audio file */}
        <input type="file" accept="audio/*" onChange={handleFileChange} />

        {/* Display selected audio file */}
        {audioUrl && (
          <div>
            {/* Assuming you have an AudioPlayer component */}
            <audio controls key={audioUrl}>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Button to trigger emotion prediction */}
        <button onClick={handleUpload}>Predict Emotion</button>

        {/* Display predicted emotion with emoji if available */}
        {emotion && (
          <div className={`emotion-container emotion-${emotion.toLowerCase()}`}>
            <p className="emotion-text">{getEmotionWithEmoji(emotion)}</p>
          </div>
        )}

        {/* Record Audio Component */}
        <RecordAudioComponent />
      </div>
      {/* Navigation bar */}
      <nav>
        {/* Logo */}
        <div className="logo-name">
          <div className="logo-image">
            <img
              src="/logoSER.png"
              alt="Logo"
              style={{
                width: "130px",
                height: "130px",
                position: "relative",
                left: "40px",
                bottom: "10px",
              }}
            />
          </div>
        </div>
        {/* Logout button in the menu */}
        <div className="menu-items">
          <ul className="logout-mode">
            <li>
              <a href="#">
                <i className="uil uil-signout"></i>
                <span className="link-name" onClick={handleLogout}>
                  <i className="bx bx-log-in-circle"></i>
                  <span className="links_name">Logout</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Test;
