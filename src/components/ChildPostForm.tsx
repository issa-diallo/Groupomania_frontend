import dayjs from 'dayjs'
import React, { FunctionComponent } from 'react'
import { Badge, Col, Image, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { Profile } from '../types'
import { DATE_FORMAT } from '../utils/constants'
import { pictureOrDefault } from '../utils/helper'

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
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={8}>
            <Image
              src={pictureOrDefault(profile.picture)}
              rounded
              height={40}
              width={40}
              className="mx-3"
            />
            <Badge bg="secondary" text="dark">
              @{profile?.pseudo}
            </Badge>
          </Col>
          <Col xs={6} md={4}>
            <Badge bg="info">{dayjs().format(DATE_FORMAT)}</Badge>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>{message && message}</Card.Text>
        <Card.Text>
          {postPicture && (
            <Image
              src={postPicture}
              alt="card-message"
              className="mx-auto d-block"
              height="560"
              width="80%"
            />
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ChildPostForm
