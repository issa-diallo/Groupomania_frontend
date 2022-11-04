import React, { FunctionComponent, useContext, useState } from 'react'
import Image from 'react-bootstrap/Image'
import { ProfileContext } from '../context/profilContext'
import Nav from 'react-bootstrap/Nav'
import { Button, Card, Form, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import ChildPostForm from './ChildPostForm'
import assert from 'assert'
import { TokenContext } from '../context/tokenContext'
import { createPost } from '../services/api'

interface propsNew {
  onCreate: () => void
}

const NewPostForm: FunctionComponent<propsNew> = ({ onCreate }) => {
  const { profile } = useContext(ProfileContext)
  const { token } = useContext(TokenContext)

  const [message, setMessage] = useState<string>('')
  const [postPicture, setPostPicture] = useState<string>('')
  const [file, setFile] = useState<File>()

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message || postPicture) {
      assert(token)
      const data = {
        user_id: profile.id,
        message: message,
      }
      file ? await createPost(token, data, file) : await createPost(token, data)
      cancelPost()
      onCreate()
    } else {
      alert('Entrer un message')
    }
  }

  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files !== null && files !== undefined) {
      setPostPicture(URL.createObjectURL(files[0]))
      setFile(files[0])
    }
  }

  const cancelPost = (): void => {
    setMessage('')
    setFile(undefined)
    setPostPicture('')
  }

  return (
    <React.Fragment>
      <Card className="mb-4">
        <Card.Header>
          <Nav.Link href="/profile">
            {profile.picture ? (
              <Image
                src={profile.picture}
                roundedCircle
                height={40}
                width={40}
                className="my-3"
              />
            ) : (
              <Image
                src={process.env.PUBLIC_URL + 'userDefault.png'}
                roundedCircle
                height={100}
                width={100}
              />
            )}
          </Nav.Link>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                id="message"
                placeholder="Quoi de neuf ?"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
                value={message}
                rows={3}
              />
              {message || postPicture ? (
                <ChildPostForm
                  profile={profile}
                  message={message}
                  postPicture={postPicture}
                />
              ) : null}
            </Form.Group>
          </Form>
        </Card.Body>
        <Form>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label>
                <FontAwesomeIcon
                  icon={faImage}
                  cursor="pointer"
                  className="p-2"
                />
                <Form.Control
                  type="file"
                  id="file"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  hidden
                  onChange={handlePicture}
                />
              </Form.Label>
            </Col>
            <Col xs="auto">
              {message || postPicture ? (
                <Button
                  className="my-3"
                  variant="outline-primary"
                  type="submit"
                  onClick={cancelPost}
                >
                  Annuler post
                </Button>
              ) : null}
              <Button
                className="my-3"
                variant="outline-success"
                type="submit"
                onClick={handlePost}
              >
                Envoyer
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </React.Fragment>
  )
}

export default NewPostForm
