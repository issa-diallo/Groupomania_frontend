import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { login } from '../services/api'
import { setTokenLocalStorage } from '../utils/tokenStorage'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../context/tokenContext'
import { AxiosError } from 'axios'
import Alert from 'react-bootstrap/Alert'
import { ErrorResponse } from '../types'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')

  const { setToken } = useContext(TokenContext)
  const navigate = useNavigate()

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  // Type guard
  const isAxiosError = (error: unknown): error is AxiosError => {
    return Boolean(error && (error as AxiosError).isAxiosError)
  }

  const onLogin = async (): Promise<void> => {
    try {
      // interact with the backend axios post
      const response = await login(email, password)
      const { token } = response
      // Adds the token to storage & TokenContext
      setTokenLocalStorage(token)
      setToken(token)
      toast.success('Vous êtes désormais connecté 😀')
      // Redirect page Home
      navigate('/')
    } catch (err: unknown) {
      console.error(err)
      if (isAxiosError(err) && err.response) {
        const axiosError = err as AxiosError<ErrorResponse>
        const { response } = axiosError
        setError(response?.data.message || '')
      }
      toast.error(' Une erreur est survenue !')
    }
  }

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  return (
    <Form onSubmit={onFormSubmit}>
      {error && <Alert className="mb-4">{error}</Alert>}
      <Form.Group className="my-3" controlId="formGroupEmail">
        <Form.Label>Adresse mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="Tapez votre adresse mail"
          name="email"
          value={email}
          onChange={onUsernameChange}
        />
      </Form.Group>
      <Form.Group className="my-3" controlId="formGroupPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Tapez votre mot de passe"
          name="password"
          value={password}
          onChange={onPasswordChange}
        />
      </Form.Group>

      <Button
        className="my-3"
        variant="success"
        type="submit"
        onClick={onLogin}
      >
        Connexion
      </Button>
    </Form>
  )
}

export default LoginForm
