import React from "react"

const PostTile = (props) => {
  console.log("props from tile", props)
  return (
    <li>
      <img src={props.post.image} />
      <h3>{props.post.caption}</h3>
    </li>
  )
}

export default PostTile