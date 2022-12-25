import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import QuizSolve from './Component/solve/QuizSolve'
import Home from './Component/Home'
import QuizCheck from './Component/check/QuizCheck'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solve" element={<QuizSolve />} />
                <Route path="/check" element={<QuizCheck />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
