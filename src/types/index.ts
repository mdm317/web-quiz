export type Quiz = {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

export type MyQuiz = {
    category: string
    type: string
    difficulty: string
    question: string
    answers: string[]
    correctAnswerIndex: number
}

export type MyQuizWithUserAnswer = {
    category: string
    type: string
    difficulty: string
    question: string
    answers: string[]
    correctAnswerIndex: number
    userAnswerIndex: number
}
export type WrongAndCorrect = {
    correct: number
    wrong: number
}
