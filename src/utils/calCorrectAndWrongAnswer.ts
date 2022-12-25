/* eslint-disable no-param-reassign */
import { MyQuizWithUserAnswer, WrongAndCorrect } from '../types'

export const calCorrectAndWrongAnswer = (
    answerList: MyQuizWithUserAnswer[]
): WrongAndCorrect =>
    answerList.reduce(
        (ac, cu) => {
            if (cu.correctAnswerIndex === cu.userAnswerIndex) {
                ac.correct += 1
            } else {
                ac.wrong += 1
            }
            return ac
        },
        { correct: 0, wrong: 0 }
    )
