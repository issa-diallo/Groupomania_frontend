import dayjs from 'dayjs'
import React, { FunctionComponent } from 'react'
import { Badge, Col, Image } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { Profile } from '../types'

interface childPostProps {
  profile: Profile
  message: string
  postPicture: string
}

const ChildPostForm: FunctionComponent<childPostProps> = ({
  profile,
  message,
  postPicture,
}) => {
  return (
    <Card className="mt-4">
      <Card.Header>
        <Col md={10}>
          {profile?.picture ? (
            <Image
              src={profile?.picture}
              rounded
              height={40}
              width={40}
              className="mx-3"
            />
          ) : (
            <Image
              src={process.env.PUBLIC_URL + 'userDefault.png'}
              rounded
              height={30}
              width={30}
              className="mx-3"
            />
          )}
          <Badge bg="secondary" text="dark">
            @{profile?.pseudo}
          </Badge>
          <Col md={{ offset: 10 }}>
            <Badge bg="info">{dayjs().format('DD MMM YYYY à HH:mm')}</Badge>
          </Col>
        </Col>
      </Card.Header>

      <Card.Body>
        <Card.Text>{message && message}</Card.Text>
        <Card.Text>
          {postPicture && (
            <Image
              src={postPicture}
              rounded
              width="560"
              height="315"
              className="mx-3"
            />
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ChildPostForm
