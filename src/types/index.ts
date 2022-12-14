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
  createdAt: string
  updatedAt: string
}
interface postRequest {
  user_id: number
  message: string
}

interface Comment {
  id: number
  user_id: number
  post_id: number
  text: string
  createdAt: string
  updatedAt: string
}

interface Like {
  id: number
  user_id: number
  post_id: number
  createdAt: string
  updatedAt: string
}

interface LikeResponse {
  count: number
  likes: Like[]
}

interface postLikeResponse {
  count: number
  message: string
}

interface ErrorResponse {
  message: string | undefined
}

export type {
  Profile,
  LoginResponse,
  Post,
  Comment,
  Like,
  LikeResponse,
  postLikeResponse,
  postRequest,
  ErrorResponse,
}
