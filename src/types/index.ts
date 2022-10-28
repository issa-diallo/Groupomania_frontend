interface Profile {
  id: number
  pseudo: string
  email: string
  picture: string
  bio?: string | null
  isAdmin: boolean
  createdAt: string
  updatedAt: string
}
interface LoginResponse {
  token: string
  userId: number
}

export type { Profile, LoginResponse }
