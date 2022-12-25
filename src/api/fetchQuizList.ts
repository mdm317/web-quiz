import axios from 'axios'
import { Quiz } from '../types'

export const fetchQuizList = async (): Promise<Quiz[]> => {
    const response = await axios.get(
        'https://opentdb.com/api.php?amount=10&type=multiple'
    )
    return response.data.results
}
