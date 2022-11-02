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
import { getPosts, getProfile, updatePost } from '../services/api'
import { ProfileContext } from '../context/profilContext'
import { getTokenLocalStorage } from '../utils/tokenStorage'
import { Post } from '../types'
import FormContainer from '../components/FormContainer'

const Home: FunctionComponent = () => {
  const { token, setToken } = useContext(TokenContext)
  const { setProfile: setProfileContext } = useContext(ProfileContext)
  const [posts, setPosts] = useState<Post[]>([])

  // Manage current profile
  useEffect(() => {
    setToken(getTokenLocalStorage())
  }, [setToken])

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

  // allows us to pick up posts
  const fetchPosts = async (): Promise<void> => {
    assert(token)
    try {
      const postAll = await getPosts(token)
      setPosts(postAll)
    } catch (error) {
      console.error(error)
    }
  }
  // when the component is loaded, the posts are picked up
  const fetchPostsCallback = useCallback(fetchPosts, [token])
  useEffect(() => {
    void (async () => await fetchPostsCallback())()
  }, [fetchPostsCallback])

  const onUpdate = (post: Post) => async (textUpdate: string) => {
    assert(token)
    await updatePost(token, post, textUpdate)
  }

  return (
    <FormContainer>
      {posts.map((post) => (
        <CardPost key={post.id} post={post} onUpdate={onUpdate(post)} />
      ))}
    </FormContainer>
  )
}

export default Home
