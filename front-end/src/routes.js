import React from 'react'
import {Routes,Route} from 'react-router-dom' //react-router-dom@6.0.0-beta.0

import Main from './pages/Main/Main.js'
import VideoDisplay from './pages/VideoDisplay/VideoDisplay'
import FacialRecognition from './pages/FacialRecognition/FacialRecognition'

export default function MainRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/video/:id" element={<VideoDisplay/>} />
            <Route path="/recfacial/" element={<FacialRecognition/>} />
        </Routes>
    )
}