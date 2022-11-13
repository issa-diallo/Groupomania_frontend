import { FunctionComponent, createContext, useState } from 'react'
import { Profile } from '../types/index'

interface ProfileContextType {
  profile: Profile
  setProfile: (profile: Profile) => void
}

interface Props {
  children: React.ReactNode
}

const defaultProfile = {
  id: 0,
  pseudo: '',
  email: '',
  picture: '',
  isAdmin: false,
  createdAt: '',
  updatedAt: '',
}
const profileContextDefault = {
  profile: defaultProfile,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProfile: () => {},
}

const ProfileContext = createContext<ProfileContextType>(profileContextDefault)

const ProfileContextProvider: FunctionComponent<Props> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile)
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileContext, ProfileContextProvider, defaultProfile }
