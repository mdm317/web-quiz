import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import QuizSolve from './Component/QuizSolve'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <QuizSolve />
        </div>
    )
}

export default App
