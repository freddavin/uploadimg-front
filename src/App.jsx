import { useState } from 'react';
import axios from 'axios';
import './App.css';

const URL = 'https://uploadimg-back.onrender.com/upload';

function App() {
  const [uploadImage, setUploadImage] = useState({ url: '' });
  const [msg, setMsg] = useState('');

  const createImage = async (newImage) => {
    axios
      .post(URL, newImage)
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          setMsg('Imagem enviada com sucesso!');
          // alert('Obrigado! Imagem enviada com sucesso!');
          return;
        }
        setMsg('Upload falhou!');
        // alert('Falha no envio');
      })
      .catch(() => {
        setMsg('Upload falhou!');
        // alert('Falha no envio');
      });
  };

  const handleSubmit = (e) => {
    if (uploadImage.url === '') {
      return;
    }
    e.preventDefault();
    setMsg('Enviando... Aguarde um instante.');
    createImage(uploadImage, e);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUploadImage({ ...uploadImage, url: base64 });
  };

  return (
    <div className="App">
      <h1>Wedding Photo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="url"
          id="file-upload"
          accept="image/*"
          onChange={(e) => handleFileUpload(e)}
        />
        <button type="submit">Upload</button>
      </form>
      {msg && <span>{msg}</span>}
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
