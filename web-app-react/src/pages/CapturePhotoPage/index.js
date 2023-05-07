import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { dataURItoBlob } from '../../utils/dataUriToBlob';
import axios from 'axios';

const CapturePhoto = () => {
  const webcamRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    const capturedFile = new File([blob], `${(Math.random() + 1).toString(36).substring(7)}.jpg`, { type: 'image/jpeg' });
    setFile(capturedFile);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post('http://localhost:3000/upload-image/', formData);
    console.log(response.data);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="relative h-full z-0 flex justify-center" style={{ height: isMobile ? '100vh' : 'auto' }}>
      {!file && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="max-w-full h-auto"
          style={{ height: isMobile ? '100%' : 'auto' }}
        />
      )}
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="Imagem selecionada"
          className="max-w-full h-auto"
          style={{ height: isMobile ? '100%' : 'auto' }}
        />
      )}
      <div className="flex justify-center items-center">
        {!file && (
          <button
            onClick={handleCapture}
            className="bg-white rounded-full p-5 shadow-md cursor-pointer border-none mr-5"
            style={{ width: isMobile ? '70px' : '50px' }}
          >
            <div className="w-3 h-3 rounded-full bg-black"></div>
          </button>
        )}
        <label htmlFor="file-upload" className="bg-white rounded-full p-5 shadow-md cursor-pointer border-none">
          <span>Upload</span>
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
      {file && (
        <button
          onClick={handleUpload}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-5 rounded-full z-100 bg-white shadow-md cursor-pointer border-none flex justify-center items-center"
          style={{ width: isMobile ? '70px' : '50px' }}
        >
          <span className="font-bold text-sm">Enviar</span>
        </button>
      )}
    </div>
  );
};

export default CapturePhoto;
