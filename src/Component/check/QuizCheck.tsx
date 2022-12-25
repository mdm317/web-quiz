import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { calChartData } from '../../utils/calChartData'
import { useQuizStore } from '../../store/quizStore'
import { calCorrectAndWrongAnswer } from '../../utils/calCorrectAndWrongAnswer'
import CheckQuestionContainer from './CheckQuestionContainer'

ChartJS.register(ArcElement, Tooltip, Legend)

function QuizCheck() {
    const quizDatas = useQuizStore((state) => state.quizDatas)
    const spendTime = useQuizStore((state) => state.spendTime)
    const correctAndWrong = calCorrectAndWrongAnswer(quizDatas)
    return (
        <div>
            <div>정답 수 {correctAndWrong.correct}</div>
            <div>오답 수 {correctAndWrong.wrong}</div>
            <div>소요 시간 {(spendTime / 1000).toFixed()}s</div>
            <h1>정답 비율</h1>
            <Pie data={calChartData(correctAndWrong)} />
            <h1>오답노트</h1>
            <CheckQuestionContainer />
        </div>
    )
}

export default QuizCheck
