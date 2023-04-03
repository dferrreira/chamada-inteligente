import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dataURItoBlob } from '../../utils/dataUriToBlob';
import axios from 'axios';
import Webcam from 'react-webcam';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [photo, setPhoto] = useState(null);
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('birthdate', data.birthdate);
    formData.append('photo', photo);
    const response = await axios.post('/api/alunos', formData);
    console.log(response.data);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    setPhoto(file);
    setShowCamera(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nome:</label>
        <input type="text" id="name" {...register("name", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.name && <span className="text-red-500">Este campo é obrigatório</span>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="birthdate" className="block text-gray-700 font-bold mb-2">Data de Nascimento:</label>
        <input type="date" id="birthdate" {...register("birthdate", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.birthdate && <span className="text-red-500">Este campo é obrigatório</span>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">Foto:</label>
        {photo ? (
          <img src={URL.createObjectURL(photo)} alt="Foto" className="mb-4" />
        ) : (
          <>
            {showCamera ? (
              <>
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="mb-4" />
                <button type="button" onClick={handleCapture} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Tirar Foto</button>
              </>
            ) : (
              <button type="button" onClick={() => setShowCamera(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Abrir Câmera</button>
            )}
          </>
        )}
        {errors.photo && <span className="text-red-500">Este campo é obrigatório</span>}
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text">Cadastrar</button>
      </form>
  );

};

export default RegisterPage;