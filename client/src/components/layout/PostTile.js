import React from "react"
import { Link } from "react-router-dom"

const PostTile = ({post}) => {
  return (
    <li>
      <img src={post.image} />
      <Link to={`/user-profile/${post.owner.id}`}>
      {post.owner.username}:
      </Link>
      <p>{post.caption}</p>
    </li>
  )
}

export default PostTile