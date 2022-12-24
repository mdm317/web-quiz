import { useState, useEffect } from 'react'
import { fetchQuizList } from '../api/fetchQuizList'
import { MyQuiz } from '../types'
import { rand } from '../utils/random'

function useQuizList(): MyQuiz[] | null {
    const [quizList, setQuizList] = useState<null | MyQuiz[]>(null)
    useEffect(() => {
        fetchQuizList().then((li) => {
            const myQuizList: MyQuiz[] = li.map((quizData) => {
                const correctAnswerIndex = rand(0, 4)
                const answers = [...new Array(4)].map((_, i) => {
                    if (i === correctAnswerIndex) {
                        return quizData.correct_answer
                    }
                    const incorrectAnswerIndex =
                        i > correctAnswerIndex ? i - 1 : i
                    return quizData.incorrect_answers[incorrectAnswerIndex]
                })

                // eslint-disable-next-line camelcase
                const { correct_answer, incorrect_answers, ...rest } = quizData
                const newQuiz: MyQuiz = {
                    ...rest,
                    answers,
                    correctAnswerIndex,
                }
                return newQuiz
            })
            setQuizList(myQuizList)
        })
    }, [])
    return quizList
}

export default useQuizList
