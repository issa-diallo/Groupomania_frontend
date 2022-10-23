import { useContext, useEffect, useState } from 'react'
import { Profile } from '../types'
import { TokenContext } from '../context/tokenContext'
import { ProfileContext } from '../context/profilContext'
import { getProfile, uploadProfile } from '../services/api'
import ProfileForm from '../components/ProfileForm'
import UploadImageProfile from '../components/UploadImageProfile'
import { Col, Container, Row } from 'react-bootstrap'
import assert from 'assert'
import { getTokenLocalStorage } from '../utils/tokenStorage'

const ProfilePage = () => {
  const { token, setToken } = useContext(TokenContext)
  const { profile, setProfile } = useContext(ProfileContext)
  const [profileState, setProfileState] = useState<Profile>(profile)
  const [file, setFile] = useState<File>()

  // get token some storage
  useEffect(() => {
    setToken(getTokenLocalStorage())
  }, [setToken])

  useEffect(() => {
    if (!token) return
    const fetchProfile = async (token: string) => {
      // interact with the backend for get user connected by token
      const response = await getProfile(token)
      // Update profil local with useState
      setProfileState(response)
      // Update profil with useContext
      setProfile(response)
      return response
    }
    fetchProfile(token)
  }, [token])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target
    if (files !== null && files !== undefined) {
      setFile(files[0])
    }
  }

  const onFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!file) return
    if (file) {
      assert(token)
      // interact db for update profile
      const data = await uploadProfile(token, profileState.id, file)
      // Update profil with useContext
      setProfile(data)
      // Update profil with state
      setProfileState(data)
    }
  }

  return (
    <Container>
      <h1>Profile</h1>
      <Row>
        <Col md={6}>
          <UploadImageProfile
            profile={profileState}
            onInputChange={onInputChange}
            onFormSubmit={onFormSubmit}
          />
        </Col>
        <Col md={6}>
          <ProfileForm profile={profileState} />
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
