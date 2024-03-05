import React from "react"
import { Link } from "react-router-dom"

const PostTile = ({post}) => {
  return (
    <li>
      <img src={post.image} className="size-image"/>
      <p>
        <Link to={`/user-profile/${post.owner.id}`} className="username">
          {post.owner.username}
        </Link>: {post.caption}
      </p>
    </li>
  )
}

export default PostTile