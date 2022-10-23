import React, { FunctionComponent, useContext, useState } from 'react'
import { ProfileContext } from '../context/profilContext'
import { Post } from '../types'

interface likePostProps {
  post: Post
}

const LikeButton: FunctionComponent<likePostProps> = ({ post }) => {
  const [liked, setLikes] = useState(false)
  const profile = useContext(ProfileContext)
  return <div>LikeButton</div>
}
export default LikeButton
