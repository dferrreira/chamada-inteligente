import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dataURItoBlob } from '../../utils/dataUriToBlob';
import axios from 'axios';
import Webcam from 'react-webcam';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [photo, setPhoto] = useState(null);
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const alunoNome = data.name.replaceAll(' ', '_');
      const photoData = new FormData();
      
      formData.append('name', data.name);
      formData.append('ra', data.ra);
      formData.append('image_public_id', `./src/img/${alunoNome}.jpg`);
      photoData.append('image', photo, `${alunoNome}.jpg`);

      console.log("@>>>", data, formData, photo, photoData);

      const response = await axios.post('http://localhost:3000/usuarios', { ...data, image_public_id: `./src/img/${alunoNome}.jpg` });
      const photoresp = await axios.post('http://localhost:3000/upload-user-image', photoData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response, photoresp);
      console.log("Registrado com sucesso!");
      reset();
    } catch (e) {
      alert('Falha ao registrar');
      throw new Error("Algo falhou" + e);
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    const file = new File([blob], `${(Math.random() + 1).toString(36).substring(7)}.jpg`, { type: 'image/jpeg' });
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
        <label htmlFor="ra" className="block text-gray-700 font-bold mb-2">R.A.:</label>
        <input type="text" id="ra" {...register("ra", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cadastrar</button>
      </form>
  );

};

export default RegisterPage;
