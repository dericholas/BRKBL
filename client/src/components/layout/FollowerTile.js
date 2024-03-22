import React, { useState } from "react"
import { Link } from "react-router-dom"
import FollowButton from "./Buttons/FollowButton"
import UnfollowButton from "./Buttons/UnfollowButton"

const FollowerTile = ({id, username, isFollowed, isFollowing}) => {
    const [followingStatus, setFollowingStatus] = useState(!!isFollowing)

    return (
        <li key={id}>
            <Link to={`/user-profile/${id}`}>{username}</Link>
            {isFollowed ? "-follows you" : null}
            {followingStatus ? UnfollowButton({id, setFollowingStatus}) : FollowButton({id, setFollowingStatus})}
        </li>
    )
}

export default FollowerTile