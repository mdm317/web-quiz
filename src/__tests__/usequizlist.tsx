import '@testing-library/jest-dom'
import * as React from 'react'

import {
    fireEvent,
    render,
    screen,
    renderHook,
    waitFor,
} from '@testing-library/react'
import * as fetch from '../api/fetchQuizList'
import * as randomUtil from '../utils/random'

import useQuizList from '../hooks/useQuizList'
import { Quiz } from '../types'

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
]

test('정답 1개와 오답3개가 모두 화면에 보여야 한다.', async () => {
    jest.spyOn(fetch, 'fetchQuizList').mockResolvedValue(mockQuizData)

    jest.spyOn(randomUtil, 'rand').mockImplementation(() => 2)
    const { result } = renderHook(() => useQuizList())

    await waitFor(() => {
        expect(result.current && result.current[0].answers).toEqual([
            'RPK',
            'M16',
            'AK-47',
            'MG 42',
        ])
    })
})
