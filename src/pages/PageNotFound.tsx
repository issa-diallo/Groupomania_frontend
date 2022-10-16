import React from 'react'
import Alert from 'react-bootstrap/Alert'
import FormContainer from '../components/FormContainer'

const PageNotFound = () => {
  return (
    <FormContainer>
      <h1>404</h1>
      <h1>Ooops...</h1>
      <Alert variant={'danger'}>
        Je pense que vous venez d'aller sur une page inexistante.
      </Alert>
    </FormContainer>
  )
}

export default PageNotFound
