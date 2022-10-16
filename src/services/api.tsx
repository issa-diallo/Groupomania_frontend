import axios from 'axios'
import { Token } from '../types'
import { BACKEND_URL } from './constants'

const login = async (email: string, password: string): Promise<Token> => {
  const data = { email, password }
  const url = BACKEND_URL + '/api/v1/users/login'
  const response = await axios.post(url, data)
  return response.data
}

const register = async (
  pseudo: string,
  email: string,
  password: string
  // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<{}> => {
  const data = { pseudo, email, password }
  const url = BACKEND_URL + '/api/v1/users/register'
  const response = await axios.post(url, data, { withCredentials: true })
  return response.data
}

export { login, register }
