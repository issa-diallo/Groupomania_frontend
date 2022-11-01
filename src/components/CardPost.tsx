import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Comment, Post, Profile } from '../types'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { ProfileContext } from '../context/profilContext'
import dayjs from 'dayjs'
import { Badge, Image, Row } from 'react-bootstrap'
import LikeButton from './LikeButton'
import assert from 'assert'
import { TokenContext } from '../context/tokenContext'
import { getComments, getUserCreatePost } from '../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'

interface cardPostProps {
  post: Post
}

const CardPost: FunctionComponent<cardPostProps> = ({ post }) => {
  const { profile } = useContext(ProfileContext)
  const { token } = useContext(TokenContext)
  const [userState, setUserState] = useState<Profile>()
  const [commentState, setCommentState] = useState<Comment[]>([])

  const fetchUser = async (): Promise<void> => {
    assert(token)
    try {
      const user = await getUserCreatePost(token, post.user_id)
      setUserState(user)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserCallback = useCallback(fetchUser, [token])
  useEffect(() => {
    void (async () => await fetchUserCallback())()
  }, [fetchUserCallback])

  // allows us to pick up comments by posts
  const fetchComments = async (): Promise<void> => {
    assert(token)
    try {
      const commentsAll = await getComments(token, post.id)
      setCommentState(commentsAll)
    } catch (error) {
      console.error(error)
    }
  }
  // when the component is loaded, the comments are picked up
  const fetchCommentsCallback = useCallback(fetchComments, [token])
  useEffect(() => {
    void (async () => await fetchCommentsCallback())()
  }, [fetchCommentsCallback])

  return (
    <Card className="mb-2" border="danger">
      <Card.Header>
        <Col md={4}>
          {userState?.picture ? (
            <Image
              src={userState?.picture}
              rounded
              height={30}
              width={30}
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
            @{userState?.pseudo}
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
          {post.picture && (
            <Image
              src={post.picture}
              alt="card-message"
              width="100%"
              height="100%"
            />
          )}
        </Card.Text>
        <Card.Text>
          {post.video && (
            <iframe
              width="560"
              height="315"
              src={post.video}
              title={userState?.pseudo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <FontAwesomeIcon icon={faCommentDots} cursor="pointer" />
            {commentState.length}
          </Col>
          <Col md="auto">
            <LikeButton post={post} />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default CardPost
