import create from 'zustand'
import { MyQuizWithUserAnswer } from '../types'

interface QuizStoreState {
    quizDatas: MyQuizWithUserAnswer[]
    add: (quizData: MyQuizWithUserAnswer) => void
    reset: () => void
}

export const useQuizStore = create<QuizStoreState>()((set) => ({
    quizDatas: [],
    add: (quizData) =>
        set((state) => {
            state.quizDatas.push(quizData)
            return { quizDatas: state.quizDatas }
        }),
    reset: () => set(() => ({ quizDatas: [] })),
}))
