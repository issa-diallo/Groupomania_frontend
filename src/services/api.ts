import axios from 'axios'
import {
  LoginResponse,
  Post,
  Profile,
  Comment,
  LikeResponse,
  postLikeResponse,
  postRequest,
} from '../types'
import { BACKEND_URL } from './constants'

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const data = { email, password }
  const url = BACKEND_URL + '/api/v1/users/login'
  const response = await axios.post(url, data)
  return response.data
}

const register = async (
  pseudo: string,
  email: string,
  password: string
  // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<{}> => {
  const data = { pseudo, email, password }
  const url = BACKEND_URL + '/api/v1/users/register'
  const response = await axios.post(url, data)
  return response.data
}

const updateUser = async (token: string, profil: Profile): Promise<Profile> => {
  const url = BACKEND_URL + `/api/v1/users/${profil.id}`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.put<Profile>(url, profil, { headers })
  return response.data
}

const getProfile = async (token: string): Promise<Profile> => {
  const url = BACKEND_URL + `/api/v1/users/jwtid`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<Profile>(url, { headers })
  return response.data
}

const getUserToCreatePost = async (
  token: string,
  postUserId: number
): Promise<Profile> => {
  const url = BACKEND_URL + `/api/v1/users/${postUserId}`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<Profile>(url, { headers })
  return response.data
}

const uploadProfile = async (
  token: string,
  id: number,
  file: File
): Promise<Profile> => {
  const url = BACKEND_URL + `/api/v1/users/upload/${id}`
  const data = { file }
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Token ${token}`,
  }
  const response = await axios.post<Profile>(url, data, {
    headers,
  })
  return response.data
}

const getPosts = async (token: string): Promise<Post[]> => {
  const url = BACKEND_URL + '/api/v1/post'
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<Post[]>(url, { headers })
  return response.data
}

const getComments = async (
  token: string,
  postId: number
): Promise<Comment[]> => {
  const url = BACKEND_URL + `/api/v1/post/${postId}/comments`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<Comment[]>(url, { headers })
  return response.data
}

const getLikes = async (
  token: string,
  postId: number
): Promise<LikeResponse> => {
  const url = BACKEND_URL + `/api/v1/post/like/${postId}`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<LikeResponse>(url, {
    headers,
  })
  return response.data
}

const likePost = async (
  token: string,
  postId: number
): Promise<postLikeResponse> => {
  const url = BACKEND_URL + `/api/v1/post/like/${postId}`
  const headers = { Authorization: `Bearer ${token}` }
  const data = {}
  const response = await axios.post<postLikeResponse>(url, data, {
    headers,
  })
  return response.data
}

const likeDelete = async (
  token: string,
  postId: number
): Promise<postLikeResponse> => {
  const url = BACKEND_URL + `/api/v1/post/unlike/${postId}`
  const headers = { Authorization: `Bearer ${token}` }
  const data = {}
  const response = await axios.post<postLikeResponse>(url, data, {
    headers,
  })
  return response.data
}

const updatePost = async (
  token: string,
  post: Post,
  message: string
): Promise<Post> => {
  const url = BACKEND_URL + `/api/v1/post/${post.id}`
  const headers = { Authorization: `Token ${token}` }
  const data = { message: message }
  const response = await axios.put<Post>(url, data, { headers })
  return response.data
}

// eslint-disable-next-line @typescript-eslint/ban-types
const deletePost = async (token: string, postId: number) => {
  const url = BACKEND_URL + `/api/v1/post/${postId}`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.delete(url, { headers })
  response.data
}

const createPost = async (
  token: string,
  post: postRequest,
  file?: File
): Promise<Post> => {
  const url = BACKEND_URL + `/api/v1/post/`
  const headers = {
    Authorization: `Token ${token}`,
    'Content-Type': 'multipart/form-data',
  }
  const data = {
    message: post.message,
    file,
  }
  const response = await axios.post<Post>(url, data, { headers })
  return response.data
}

export {
  login,
  register,
  updateUser,
  getProfile,
  uploadProfile,
  getPosts,
  getComments,
  getUserToCreatePost,
  getLikes,
  likePost,
  likeDelete,
  updatePost,
  deletePost,
  createPost,
}
