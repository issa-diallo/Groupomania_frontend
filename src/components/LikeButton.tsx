import assert from 'assert'
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ProfileContext } from '../context/profilContext'
import { TokenContext } from '../context/tokenContext'
import { getLikes, likeDelete, likePost } from '../services/api'
import { Post } from '../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

interface likePostProps {
  post: Post
}

const LikeButton: FunctionComponent<likePostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const [likers, setLikers] = useState<number>()
  const { profile } = useContext(ProfileContext)
  const { token } = useContext(TokenContext)

  const fetchLike = async (): Promise<void> => {
    assert(token)
    try {
      const data = await getLikes(token, post.id)
      setLikers(data.count)
      data.likes.forEach((like) => {
        if (like.user_id === profile.id) {
          setLiked(true)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchLikeCallback = useCallback(fetchLike, [token])
  useEffect(() => {
    void (async () => await fetchLikeCallback())()
  }, [fetchLikeCallback])

  const like = async () => {
    assert(token)
    const data = await likePost(token, post.id, profile.id)
    setLiked(true)
    setLikers(data.count)
  }

  const unLike = async () => {
    assert(token)
    const data = await likeDelete(token, post.id, profile.id)
    setLiked(false)
    setLikers(data.count)
  }

  return (
    <React.Fragment>
      {liked === false && (
        <FontAwesomeIcon icon={faHeart} onClick={like} cursor="pointer" />
      )}
      {liked && (
        <FontAwesomeIcon
          icon={faHeartSolid}
          onClick={unLike}
          cursor="pointer"
        />
      )}
      <span>{likers}</span>
    </React.Fragment>
  )
}
export default LikeButton
