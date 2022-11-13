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
import { toast } from 'react-toastify'

interface LikePostProps {
  post: Post
}

const LikeButton: FunctionComponent<LikePostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const [likers, setLikers] = useState<number>()
  const { profile } = useContext(ProfileContext)
  const { token } = useContext(TokenContext)

  const fetchLike = async (): Promise<void> => {
    assert(token)
    try {
      const { count, likes } = await getLikes(token, post.id)
      setLikers(count)
      const hasLiked = likes.map((like) => like.user_id).includes(profile.id)
      setLiked(hasLiked)
    } catch (error) {
      toast.error('Impossible de charger la liste des likes !')
      console.error(error)
    }
  }

  const fetchLikeCallback = useCallback(fetchLike, [token])
  useEffect(() => {
    void (async () => await fetchLikeCallback())()
  }, [fetchLikeCallback])

  const like = async () => {
    assert(token)
    const { count } = await likePost(token, post.id)
    setLiked(true)
    setLikers(count)
  }

  const unLike = async () => {
    assert(token)
    const { count } = await likeDelete(token, post.id)
    setLiked(false)
    setLikers(count)
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
