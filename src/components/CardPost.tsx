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
import { Badge, Button, Form, Image, Row } from 'react-bootstrap'
import LikeButton from './LikeButton'
import assert from 'assert'
import { TokenContext } from '../context/tokenContext'
import {
  getComments,
  getUserToCreatePost,
  updatePost as update,
} from '../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import DeleteButtonPost from './DeleteButtonPost'
import { toast } from 'react-toastify'

interface cardPostProps {
  post: Post
  onUpdate: () => void
}

const CardPost: FunctionComponent<cardPostProps> = ({ post, onUpdate }) => {
  const { profile } = useContext(ProfileContext)
  const { token } = useContext(TokenContext)
  const [userState, setUserState] = useState<Profile>()
  const [isUpdated, setIsUpdaded] = useState(false)
  const [textUpdate, setTextUpdate] = useState<string>('')

  useEffect(() => {
    setTextUpdate(post.message)
  }, [post])

  const onTextUpdateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTextUpdate(e.target.value)
  }

  const onUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (textUpdate) {
      assert(token)
      await update(token, post, textUpdate)
      onUpdate()
      toast.info('Votre post a bien été modifié !')
    }
    setIsUpdaded(false)
  }

  // Foreach post get user
  const fetchUser = async (): Promise<void> => {
    assert(token)
    try {
      const user = await getUserToCreatePost(token, post.user_id)
      setUserState(user)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserCallback = useCallback(fetchUser, [token])
  useEffect(() => {
    void (async () => await fetchUserCallback())()
  }, [fetchUserCallback])

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
            {post.createdAt === post.updatedAt &&
              dayjs(post.createdAt).format('DD MMM YYYY à HH:mm')}
            {post.createdAt !== post.updatedAt &&
              dayjs(post.updatedAt).format('DD MMM YYYY à HH:mm')}
          </Badge>
        </Col>
      </Card.Header>
      <Card.Body>
        {isUpdated === false && <Card.Text>{textUpdate}</Card.Text>}
        {isUpdated === true && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                defaultValue={textUpdate}
                onChange={onTextUpdateChange}
                rows={3}
              />
            </Form.Group>
            <Button
              className="my-1"
              variant="info"
              type="submit"
              onClick={onUpdatePost}
            >
              Valider modification
            </Button>
          </Form>
        )}
        <Card.Text>
          <Col>
            {post.picture && (
              <Image
                src={post.picture}
                alt="card-message"
                className="mx-auto d-block"
                height="560"
                width="80%"
              />
            )}
          </Col>
        </Card.Text>
        {profile.id === post.user_id && (
          <Card.Text>
            <Row className="justify-content-md-center">
              <Col md={4}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  cursor="pointer"
                  onClick={() => setIsUpdaded(!isUpdated)}
                />
              </Col>
              <Col md="auto">
                <DeleteButtonPost post={post} onDelete={onUpdate} />
              </Col>
            </Row>
          </Card.Text>
        )}
      </Card.Body>
      <Card.Footer>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <LikeButton post={post} />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default CardPost
