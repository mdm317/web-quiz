import axios from 'axios'
import { Quiz } from '../types'

export const fetchQuizList = async (): Promise<Quiz[]> => {
    const response = await axios.get('https://opentdb.com/api.php?amount=10')
    return response.data.results
}
