import assert from 'assert'
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import CardPost from '../components/CardPost'
import { TokenContext } from '../context/tokenContext'
import { getPosts, getProfile } from '../services/api'
import { ProfileContext } from '../context/profilContext'
import { getTokenLocalStorage } from '../utils/tokenStorage'
import { Post } from '../types'
import NewPostForm from '../components/NewPostForm'
import { Container } from 'react-bootstrap'

const useUpdateProfile = (token: string | null | undefined) => {
  const { setProfile: setProfileContext } = useContext(ProfileContext)
  useEffect(() => {
    if (!token) return
    const fetchProfile = async (token: string) => {
      // interact with the backend for get user connected by token
      const profile = await getProfile(token)
      // Update profil with useContext
      setProfileContext(profile)
    }
    fetchProfile(token)
  }, [token])
}

const useToken = () => {
  const { token, setToken } = useContext(TokenContext)
  // Manage current profile
  useEffect(() => {
    setToken(getTokenLocalStorage())
  }, [setToken])

  useUpdateProfile(token)

  return token
}

const useFetchPost = (token: string | null | undefined) => {
  const [posts, setPosts] = useState<Post[]>([])
  const fetchPosts = useCallback(async (): Promise<void> => {
    assert(token)
    try {
      const postAll = await getPosts(token)
      setPosts(postAll)
    } catch (error) {
      console.error(error)
    }
  }, [token])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return [posts, fetchPosts] as const
}

const Home: FunctionComponent = () => {
  const token = useToken()
  const [posts, fetchPosts] = useFetchPost(token)

  return (
    <Container>
      <NewPostForm onCreate={fetchPosts} />
      {posts.map((post) => (
        <CardPost key={post.id} post={post} onUpdate={fetchPosts} />
      ))}
    </Container>
  )
}

export default Home
