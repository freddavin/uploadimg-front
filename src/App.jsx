import { useState } from 'react';
import axios from 'axios';
import './App.css';

const URL = 'https://uploadimg-back.onrender.com/upload';

function App() {
  const [uploadImage, setUploadImage] = useState({ url: '' });

  const createImage = async (newImage) => {
    axios.post(URL, newImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createImage(uploadImage);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUploadImage({ ...uploadImage, url: base64 });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="url"
          id="file-upload"
          onChange={(e) => handleFileUpload(e)}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default App;
