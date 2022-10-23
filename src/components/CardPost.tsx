import React, { FunctionComponent, useContext } from 'react'
import { Post } from '../types'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { ProfileContext } from '../context/profilContext'
import dayjs from 'dayjs'
import { Badge, Image, Row } from 'react-bootstrap'
import LikeButton from './LikeButton'

interface cardPostProps {
  post: Post
}

const CardPost: FunctionComponent<cardPostProps> = ({ post }) => {
  const { profile } = useContext(ProfileContext)

  return (
    <Card className="mb-2" border="danger">
      <Card.Header>
        <Col md={4}>
          <Image
            src={profile.picture}
            rounded
            height={30}
            width={30}
            className="mx-3"
          />
          <Badge bg="secondary" text="dark">
            @{profile.pseudo}
          </Badge>
        </Col>
        <Col md={{ offset: 8 }}>
          <Badge bg="info">
            posté le {dayjs(post.createdAt).format('DD MMM YYYY à HH:mm')}
          </Badge>
        </Col>
      </Card.Header>
      <Card.Body>
        <Card.Text>{post.message}</Card.Text>
        <Card.Text>
          {post.picture && <Image src={post.picture} alt="card-message" />}
        </Card.Text>
        <Card.Text>
          {post.video && (
            <iframe
              width="560"
              height="315"
              src={post.video}
              title={profile.pseudo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row className="justify-content-md-center">
          <Col md={6}>comment</Col>
          <Col md="auto">
            <LikeButton post={post} />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default CardPost
