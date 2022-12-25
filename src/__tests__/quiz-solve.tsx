/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import QuizSolve from '../Component/solve/QuizSolve'
import * as fetch from '../api/fetchQuizList'
import * as randomUtil from '../utils/random'
import QuestionContainer from '../Component/solve/QuestionContainer'
import { MyQuiz, Quiz } from '../types'
import { useQuizStore } from '../store/quizStore'

const myMockQuizData: MyQuiz = {
    category: 'History',
    type: 'multiple',
    difficulty: 'medium',
    question:
        ' What Russian automatic gas-operated assault rifle was developed in the Soviet Union in 1947, and is still popularly used today?',
    answers: ['RPK', 'M16', 'MG 42', 'AK-47'],
    correctAnswerIndex: 2,
}
const mockQuizData: Quiz[] = [
    {
        category: 'History',
        type: 'multiple',
        difficulty: 'medium',
        question:
            ' What Russian automatic gas-operated assault rifle was developed in the Soviet Union in 1947, and is still popularly used today?',
        correct_answer: 'AK-47',
        incorrect_answers: ['RPK', 'M16', 'MG 42'],
    },
    {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'medium',
        question: 'How many cores does the Intel i7-6950X have?',
        correct_answer: '10',
        incorrect_answers: ['12', '8', '4'],
    },
]

const quizStore = useQuizStore.getState()
beforeEach(() => {
    quizStore.reset()
})

test('정답 1개와 오답3개가 모두 화면에 보여야 한다.', async () => {
    render(
        <QuestionContainer setCanGoNext={() => {}} quizData={myMockQuizData} />
    )
    // 답안이 보일때까지 기다림
    await screen.findByText(myMockQuizData.answers[0])
    const answers = screen.getAllByTestId('quiz-solve-answer', {
        exact: false,
    })
    ;[0, 1, 2, 3].forEach((_, i) => {
        expect(answers[i]).toHaveTextContent(myMockQuizData.answers[i])
    })
})

test('바로 정답을 알 수 있어야 한다.', async () => {
    render(
        <QuestionContainer setCanGoNext={() => {}} quizData={myMockQuizData} />
    )
    const answer = await screen.findByText(
        myMockQuizData.answers[myMockQuizData.correctAnswerIndex]
    )
    fireEvent.click(answer)

    const submitbutton = screen.getByText('제출')
    fireEvent.click(submitbutton)

    expect(await screen.findByText('정답입니다')).toBeVisible()
})

test('바로 오답을 알 수 있어야 한다.', async () => {
    render(
        <QuestionContainer setCanGoNext={() => {}} quizData={myMockQuizData} />
    )
    const answer = await screen.findByText(myMockQuizData.answers[0])
    fireEvent.click(answer)

    const submitbutton = screen.getByText('제출')
    fireEvent.click(submitbutton)

    expect(await screen.findByText('오답입니다')).toBeVisible()
})

test('다음 문항으로 넘어갈수 있어야 한다.', async () => {
    jest.spyOn(fetch, 'fetchQuizList').mockResolvedValue(mockQuizData)

    jest.spyOn(randomUtil, 'rand').mockImplementation(() => 2)
    render(<QuizSolve />)
    const answer = await screen.findByText(mockQuizData[0].incorrect_answers[0])
    fireEvent.click(answer)

    const submitbutton = screen.getByText('제출')
    fireEvent.click(submitbutton)

    expect(await screen.findByText('오답입니다')).toBeVisible()

    const button = screen.getByText('다음')
    fireEvent.click(button)

    // eslint-disable-next-line no-restricted-syntax
    for (const ans of mockQuizData[1].incorrect_answers) {
        // eslint-disable-next-line no-await-in-loop
        expect(await screen.findByText(ans)).toBeVisible()
    }
    expect(
        await screen.findByText(mockQuizData[1].correct_answer)
    ).toBeVisible()
})

test('정답을 제출할때 저장되어야 한다.', async () => {
    jest.spyOn(fetch, 'fetchQuizList').mockResolvedValue(mockQuizData)

    jest.spyOn(randomUtil, 'rand').mockImplementation(() => 2)
    render(<QuizSolve />)
    const answer = await screen.findByText(mockQuizData[0].incorrect_answers[0])
    fireEvent.click(answer)

    const submitbutton = screen.getByText('제출')
    fireEvent.click(submitbutton)

    const { correct_answer, incorrect_answers, ...rest } = mockQuizData[0]
    await waitFor(() => {
        expect(useQuizStore.getState().quizDatas[0]).toEqual({
            ...rest,
            answers: [
                incorrect_answers[0],
                incorrect_answers[1],
                correct_answer,
                incorrect_answers[2],
            ],
            correctAnswerIndex: 2,
            userAnswerIndex: 0,
        })
    })
})
