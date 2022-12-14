import assert from 'assert'
import dayjs from 'dayjs'
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { ProfileContext } from '../context/profilContext'
import { TokenContext } from '../context/tokenContext'
import { updateUser } from '../services/api'
import { Profile } from '../types'
import { DATE_FORMAT } from '../utils/constants'

interface ProfileProps {
  profile: Profile
}

const ProfileForm: FunctionComponent<ProfileProps> = ({ profile }) => {
  const { token } = useContext(TokenContext)

  // local unsaved profile state so we only hit the profile context after saving
  const [profileState, setProfileState] = useState<Profile>(profile)
  const { setProfile: setProfileContext } = useContext(ProfileContext)

  useEffect(() => {
    setProfileState(profile)
  }, [profile])

  const onFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
  }

  const onUpdate = async (): Promise<void> => {
    assert(token)
    try {
      // interact with the backend axios
      const data = await updateUser(token, profileState)
      setProfileContext(data)
      toast.success('Vos modifications ont bien été enregistré')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Label>Pseudo</Form.Label>
      <Form.Control
        placeholder="pseudo"
        className="me-2"
        autoComplete="off"
        value={profileState.pseudo}
        disabled
      />
      <Form.Label>Email</Form.Label>
      <Form.Control
        placeholder="Email"
        className="me-2"
        aria-label="Email"
        autoComplete="off"
        disabled
        onChange={(e) =>
          setProfileState({ ...profileState, email: e.target.value })
        }
        value={profileState.email}
      />
      <Form.Label>Bio</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Bio"
        className="me-2"
        autoComplete="off"
        onChange={(e) =>
          setProfileState({ ...profileState, bio: e.target.value })
        }
        value={profileState.bio || ''}
      />
      <Form.Text id="passwordHelpBlock" muted>
        Membre depuis le : {dayjs(profileState.createdAt).format(DATE_FORMAT)}
      </Form.Text>
      <br />
      <Button
        className="my-3"
        variant="success"
        type="submit"
        onClick={onUpdate}
      >
        Modifier
      </Button>
    </Form>
  )
}

export default ProfileForm
