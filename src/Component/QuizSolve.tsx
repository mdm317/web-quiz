import React, { useState } from 'react'
import useQuizList from '../hooks/useQuizList'
import QuestionContainer from './QuestionContainer'

function QuizSolve() {
    const quizList = useQuizList()
    const [quizOrder, setQuizOrder] = useState(0)
    const [canGoNext, setCanGoNext] = useState(false)
    if (quizList === null) return <h1>Loading</h1>
    const quizData = quizList[quizOrder]
    const goNextQuestion = () => {
        if (canGoNext) {
            setCanGoNext(false)
            setQuizOrder(quizOrder + 1)
        }
    }
    return (
        <>
            <QuestionContainer
                key={quizData.question}
                quizData={quizData}
                setCanGoNext={setCanGoNext}
            />
            <div>
                {canGoNext && (
                    <button type="button" onClick={goNextQuestion}>
                        다음
                    </button>
                )}
            </div>
        </>
    )
}

export default QuizSolve
