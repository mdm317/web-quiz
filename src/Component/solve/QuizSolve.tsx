import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useQuizList from '../../hooks/useQuizList'
import { useQuizStore } from '../../store/quizStore'
import QuestionContainer from './QuestionContainer'

function QuizSolve() {
    const quizList = useQuizList()
    const [quizOrder, setQuizOrder] = useState(0)
    const [canGoNext, setCanGoNext] = useState(false)

    const navigate = useNavigate()
    const reset = useQuizStore((state) => state.reset)

    const setStartTime = useQuizStore((state) => state.setStartTime)
    const setEndTime = useQuizStore((state) => state.setEndTime)
    useEffect(() => {
        setStartTime()
        reset()
    }, [])

    if (quizList === null) return <h1>Loading</h1>
    const quizData = quizList[quizOrder]
    const goNextQuestion = () => {
        const isNextQuestion = quizList.length - 1 > quizOrder
        if (canGoNext && isNextQuestion) {
            setCanGoNext(false)
            setQuizOrder(quizOrder + 1)
        } else {
            setEndTime()
            navigate('../check')
        }
    }

    return (
        <>
            <h1>
                {quizOrder + 1}/{quizList.length}
            </h1>
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
