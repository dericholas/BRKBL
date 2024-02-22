import React from "react"
import { Link } from "react-router-dom"

const UserPostTile = ({post}) => {
  return (
    <li>
      <img src={post.image} />
      {post.owner.username}:
      <p>{post.caption}</p>
    </li>
  )
}

export default UserPostTile