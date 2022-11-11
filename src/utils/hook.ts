import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeTokenLocalStorage } from './tokenStorage'
import { TokenContext } from '../context/tokenContext'
import { toast } from 'react-toastify'

/**
 * Returns:
 * - true if a token in a valid format is stored
 * - undefined if the application is still loading
 * - false if the token is in an invalid format
 */
const useIsLoggedIn = (): boolean | undefined => {
  const { token } = useContext(TokenContext)

  // application is still loading
  if (token === undefined) return undefined
  const tokenValid = typeof token === 'string' ? token.length > 0 : false
  return tokenValid
}

const useLogout = (): (() => void) => {
  const { setToken } = useContext(TokenContext)
  const navigate = useNavigate()
  return () => {
    removeTokenLocalStorage()
    setToken(null)
    toast.info('Vous êtes désormais déconnecté 😀')
    navigate('/login')
  }
}

export { useIsLoggedIn, useLogout }
