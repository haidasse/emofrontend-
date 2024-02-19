import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Appell() {
  const [audioHistory, setAudioHistory] = useState([]);

  useEffect(() => {
    fetchAudioHistory();
  }, []);

  const fetchAudioHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/audio-history");
      console.log(response);
      console.log(response.data);
      setAudioHistory(response.data);
    } catch (error) {
      console.error('Error fetching audio history:', error);
    }
  };

  const getEmotionWithEmoji = (emotion) => {
    const emojiMap = {
      angry: '😡',
      fear: '😱',
      disgust: '🤢',
      surprise: '😲',
      calm: '😌',
      happy: '😄',
      sad: '😢',
      neutral: '😐',
    };
    return emojiMap[emotion] || 'Unknown'; // Return "Unknown" if emotion not found in map
  };

  return (
    <div>
      <h1>Audio Emotion History</h1>
      <ul>
        {audioHistory.map((audioItem, index) => (
          <li key={index}>
            <audio controls>
              <source src={audioItem.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            {audioItem.emotion && getEmotionWithEmoji(audioItem.emotion)}
            {console.log(audioItem.emotion)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appell;
