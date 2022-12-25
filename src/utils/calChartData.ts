import { WrongAndCorrect } from '../types'

export const calChartData = ({ correct, wrong }: WrongAndCorrect) => {
    return {
        labels: ['correct answer', 'wrong answer'],
        datasets: [
            {
                data: [correct, wrong],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderWidth: 1,
            },
        ],
    }
}
