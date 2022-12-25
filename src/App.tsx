import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import QuizSolve from './Component/QuizSolve'
import Home from './Component/Home'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solve" element={<QuizSolve />} />
                <Route path="/check" element={<QuizSolve />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
