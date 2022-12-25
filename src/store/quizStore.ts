import create from 'zustand'
import { MyQuizWithUserAnswer } from '../types'

interface QuizStoreState {
    quizDatas: MyQuizWithUserAnswer[]
    startTime: Date
    spendTime: number
    add: (quizData: MyQuizWithUserAnswer) => void
    reset: () => void
    setStartTime: () => void
    setEndTime: () => void
}

export const useQuizStore = create<QuizStoreState>()((set) => ({
    quizDatas: [],
    spendTime: 0,
    startTime: new Date(),
    add: (quizData) =>
        set((state) => {
            state.quizDatas.push(quizData)
            return { quizDatas: state.quizDatas }
        }),
    reset: () => set(() => ({ quizDatas: [] })),
    setStartTime: () =>
        set(() => ({
            startTime: new Date(),
        })),
    setEndTime: () =>
        set((state) => ({
            spendTime: new Date().getTime() - state.startTime.getTime(),
        })),
}))
