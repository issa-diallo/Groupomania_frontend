import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { register } from '../services/api'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pseudo, setPseudo] = useState('')

  const navigate = useNavigate()

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  const onPseudoChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPseudo(e.target.value)

  const onLogin = async (): Promise<void> => {
    try {
      // interact with the backend axios post
      await register(pseudo, email, password)
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group className="my-3" controlId="formGroupPseudo">
        <Form.Label>Pseudo</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Tapez votre pseudo"
          name="email"
          value={pseudo}
          onChange={onPseudoChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="my-3" controlId="formGroupEmail">
        <Form.Label>Adresse mail</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Tapez votre adresse mail"
          name="email"
          value={email}
          onChange={onEmailChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          required
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
        Inscription
      </Button>
    </Form>
  )
}

export default RegisterForm
