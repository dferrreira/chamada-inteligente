import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { dataURItoBlob } from '../../utils/dataUriToBlob';
import axios from 'axios';

const CapturePhoto = () => {
    const webcamRef = useRef(null);

    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const formData = new FormData();
        formData.append('image', dataURItoBlob(imageSrc));
        const response = await axios.post('api', formData);
        console.log(response.data);
    };

    const isMobile = window.innerWidth <= 768;

    return (
        <div className="relative h-full z-0 flex justify-center" style={{ height: isMobile ? '100vh' : 'auto' }}>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="max-w-full h-auto" style={{ height: isMobile ? '100%' : 'auto' }} />
            <button onClick={capture} className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-5 rounded-full z-100 bg-white shadow-md cursor-pointer border-none flex justify-center items-center" style={{ width: isMobile ? '70px' : '50px' }}>
                <div className="w-3 h-3 rounded-full bg-black"></div>
            </button>
        </div>
    );
};

export default CapturePhoto;
