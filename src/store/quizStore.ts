import { MyQuizWithUserAnswer } from '../types'

class QuizStore {
    quizDatas: MyQuizWithUserAnswer[] = []

    add(quizData: MyQuizWithUserAnswer) {
        this.quizDatas.push(quizData)
    }

    reset() {
        this.quizDatas = []
    }

    get() {
        return this.quizDatas
    }
}
export const quizStore = new QuizStore()
