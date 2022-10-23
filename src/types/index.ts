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

interface Post {
  id: number
  user_id: number
  message: string
  picture: string
  video: string
  createdAt: string
  updatedAt: string
}

interface Comment {
  id: number
  user_id: number
  post_id: number
  text: string
  createdAt: string
  updatedAt: string
}

export type { Profile, LoginResponse, Post, Comment }
