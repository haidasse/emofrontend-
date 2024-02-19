import React, { useState, useEffect } from "react";

const RecordAudioComponent = () => {
  const [recorded, setRecorded] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // State to store audio URL

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    console.log("Retrieved User ID:", id);
    if (!id) {
      setError("User ID not found in local storage");
    } else {
      setUserId(id);
      setLoading(false);
    }
  }, []);

  const handleRecordAudio = async () => {
    try {
      if (!userId) {
        setError("User ID not found in local storage");
        return;
      }

      const response = await fetch("http://localhost:5000/api/record-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Audio recorded successfully:", data);
        setRecorded(true);
        setAudioUrl(data.audioUrl); // Set the audio URL here
      } else {
        setError("Failed to record audio");
      }
    } catch (error) {
      console.error("Error recording audio:", error);
      setError("Failed to record audio");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error && <p>Error: {error}</p>}
          {recorded ? (
            <div>
              <p>
                Audio recorded successfully! Upload it from the recordings
                folder
              </p>
              {/* Display the audio player if audioUrl is available */}
              {audioUrl && <audio controls src={audioUrl}></audio>}
              {/* Render the record button */}
              <button onClick={handleRecordAudio} disabled={loading}>
                Record Audio
              </button>
            </div>
          ) : (
            <button onClick={handleRecordAudio} disabled={loading}>
              Record Audio
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecordAudioComponent;
