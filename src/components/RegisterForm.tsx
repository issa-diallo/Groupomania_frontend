import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { register } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import Alert from 'react-bootstrap/Alert'
import { ErrorResponse } from '../types'
import { toast } from 'react-toastify'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  const onPseudoChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPseudo(e.target.value)

  const isAxiosError = (error: unknown): error is AxiosError => {
    return Boolean(error && (error as AxiosError).isAxiosError)
  }

  const onLogin = async (): Promise<void> => {
    try {
      // interact with the backend axios post
      await register(pseudo, email, password)
      toast.success('Vous êtes désormais inscrit, vous pouvez vous connecter !')
      navigate('/login')
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response) {
        const axiosError = err as AxiosError<ErrorResponse>
        const { response } = axiosError
        setError(response?.data.message || '')
      }
      toast.error('Des erreurs dans votre formulaire')
    }
  }

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  return (
    <Form onSubmit={onFormSubmit}>
      {error && <Alert className="mb-4">{error}</Alert>}
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
