import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { login } from '../services/api'
import { setTokenLocalStorage } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../context/tokenContext'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setToken } = useContext(TokenContext)
  const navigate = useNavigate()

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  const onLogin = async (): Promise<void> => {
    try {
      // interact with the backend axios post
      const response = await login(email, password)
      const { token } = response
      setTokenLocalStorage(token)
      setToken(token)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  return (
    <Form onSubmit={onFormSubmit}>
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
