import React from 'react'
import { useQuizStore } from '../../store/quizStore'

function CheckQuestionContainer() {
    const quizDatas = useQuizStore((state) => state.quizDatas)

    const calClassName = (
        userAnswerIndex: number,
        correctAnswerIndex: number,
        curIndex: number
    ) => {
        switch (true) {
            case userAnswerIndex === correctAnswerIndex &&
                correctAnswerIndex === curIndex:
                return 'border_red'

            case curIndex === correctAnswerIndex:
                return 'border_red'
            case curIndex === userAnswerIndex:
                return 'border_blue'
            default:
                return ''
        }
    }
    return (
        <>
            <h3>빨간색이 정답 파란색이 당신이 선택한 답입니다.</h3>
            {quizDatas.map((quizData) => (
                <>
                    <div>category: {quizData.category}</div>
                    <div>difficulty : {quizData.difficulty}</div>
                    <div>{quizData.question}</div>
                    <h1>
                        {quizData.correctAnswerIndex ===
                        quizData.userAnswerIndex
                            ? '맞췄습니다.'
                            : '틀렸습니다.'}
                    </h1>

                    <ul>
                        {quizData.answers.map((answer, i) => (
                            <li
                                data-testid={`quiz-solve-answer-${i}`}
                                key={answer}
                                className={calClassName(
                                    quizData.userAnswerIndex,
                                    quizData.correctAnswerIndex,
                                    i
                                )}
                            >
                                <button type="button">{answer}</button>
                            </li>
                        ))}
                    </ul>
                </>
            ))}
        </>
    )
}

export default CheckQuestionContainer
