import React, { useState } from 'react'

import { MyQuiz } from '../types'

type QuestionContainerProp = {
    quizData: MyQuiz
    setCanGoNext: React.Dispatch<React.SetStateAction<boolean>>
}

function QuestionContainer({ quizData, setCanGoNext }: QuestionContainerProp) {
    const [isSubmit, setIsSubmit] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<
        null | number
    >(null)
    const [isCorrect, setIsCorrect] = useState<null | boolean>(null)

    const checkAnswer = () => {
        if (selectedAnswerIndex === null) return
        if (isSubmit) return
        if (selectedAnswerIndex === quizData.correctAnswerIndex) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }

        setCanGoNext(true)
        setIsSubmit(true)
    }

    return (
        <>
            <div>category: {quizData.category}</div>
            <div>difficulty : {quizData.difficulty}</div>
            <div>{quizData.question}</div>
            {isCorrect !== null && (
                <h1>{isCorrect ? '정답입니다' : '오답입니다'}</h1>
            )}
            <ul>
                {quizData.answers.map((answer, i) => (
                    <li
                        data-testid={`quiz-solve-answer-${i}`}
                        className={selectedAnswerIndex === i ? 'active' : ''}
                        key={answer}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedAnswerIndex(i)}
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
            {!isSubmit && (
                <button type="button" onClick={checkAnswer}>
                    제출
                </button>
            )}
        </>
    )
}

export default QuestionContainer
