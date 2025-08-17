import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/photos')
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error('Error fetching photos:', err));
  }, []);

  return (
    <div className="gallery">
      {photos.map((photo, index) => (
        <div key={index} className="card">
          <img src={photo.url} alt={photo.caption} />
          <p>{photo.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default App;