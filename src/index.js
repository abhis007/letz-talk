import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import VideoCall from './pages/VideoCall';
import ProfileUpdate from './pages/ProfileUpdate';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes,Route } from "react-router-dom";
import {VideoContext, VideoProvider} from './context/VideoContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
  
  
  <VideoProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Signin" element={<Signin />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Home" element={<Home />} />
      <Route path="Video" element={<VideoCall />} />
      <Route path="ProfileUpdate" element={<ProfileUpdate />} />
    </Routes>
    </BrowserRouter>
    </VideoProvider>
  
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

