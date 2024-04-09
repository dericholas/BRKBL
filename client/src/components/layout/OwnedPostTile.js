import React from "react"

const OwnedPostTile = ({post}) => {
  return (
    <li>
      <img src={post.image} />
      {post.owner.username}:
      <p>{post.caption}</p>
    </li>
  )
}

export default OwnedPostTile