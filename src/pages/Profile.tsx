import { useContext, useEffect, useState } from 'react'
import { Profile } from '../types'
import { TokenContext } from '../context/tokenContext'
import { ProfileContext } from '../context/profilContext'
import { getProfile } from '../services/api'
import FormContainer from '../components/FormContainer'
import ProfileForm from '../components/ProfileForm'
import { getTokenLocalStorage } from '../utils/helpers'

const ProfilePage = () => {
  const { token, setToken } = useContext(TokenContext)
  const { profile, setProfile } = useContext(ProfileContext)
  const [profileState, setProfileState] = useState<Profile>(profile)

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

  return (
    <FormContainer>
      <h1>Profile</h1>
      <ProfileForm profile={profileState} />
    </FormContainer>
  )
}

export default ProfilePage
