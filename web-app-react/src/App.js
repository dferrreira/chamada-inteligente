import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CapturePhoto from './pages/CapturePhotoPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={CapturePhoto} path="/faces" exact />
        <Route Component={RegisterPage} path="/register" exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
