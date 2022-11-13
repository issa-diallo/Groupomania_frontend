import React, { FunctionComponent } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { Profile } from '../types'

interface UploadImageProps {
  profile: Profile
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFormSubmit: (e: React.FormEvent) => void
}

const UploadImageProfile: FunctionComponent<UploadImageProps> = ({
  profile,
  onInputChange,
  onFormSubmit,
}) => {
  return (
    <Form onSubmit={onFormSubmit}>
      <br />
      <Row className="justify-content-md-center">
        <Col md="auto">
          {profile.picture ? (
            <Image
              src={profile.picture}
              roundedCircle
              height={190}
              width={190}
              className="my-3"
            />
          ) : (
            <Image
              src={process.env.PUBLIC_URL + 'userDefault.png'}
              roundedCircle
              height={190}
              width={190}
              className="my-3"
            />
          )}
        </Col>
      </Row>
      <Form.Control
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={onInputChange}
      />
      <Button className="my-3" variant="success" type="submit">
        Envoyer
      </Button>
    </Form>
  )
}

export default UploadImageProfile
