import React, { FunctionComponent, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { deletePost } from '../services/api'
import assert from 'assert'
import { TokenContext } from '../context/tokenContext'
import { Post } from '../types'

interface deletePostProps {
  post: Post
}

const DeleteButtonPost: FunctionComponent<deletePostProps> = ({ post }) => {
  const { token } = useContext(TokenContext)

  const deleteQuote = async () => {
    if (window.confirm('Voulez-vous supprimer ce post ?')) {
      assert(token)
      await deletePost(token, post.id)
      window.location.reload()
    }
  }

  return (
    <FontAwesomeIcon icon={faTrashCan} cursor="pointer" onClick={deleteQuote} />
  )
}

export default DeleteButtonPost
