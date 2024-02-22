import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import UserPostTile from "./UserPostTile";

const UserShow = (props) => {

    const [profileData, setProfileData] = useState([])
    const userId = props.match.params.id

    const getUserData = async () => {
        try {
            const fetchedProfileData = await fetch(`/api/v1/user-profile/${userId}`)
            const parsedProfileData = await fetchedProfileData.json()
            console.log("parsedProfileData", parsedProfileData)
            setProfileData(parsedProfileData)
        } catch (error) {
            console.error(error)
        }
    }
    console.log("profileData", profileData.user)
    useEffect(() => {
        getUserData()
    }, [])
    let followerList = []
    let postTiles = []
    let followingList = []
    let username = ""
    let formattedDate = ""
    if (profileData.posts) {
        postTiles = profileData.posts.map((post) => {
            return (
                <UserPostTile key={post.id}
                    post={post}
                />
            )
        })
    }
    if (profileData.followers) {
        followerList = profileData.followers.map((follower) => {
            return (
                <li key={follower.id}>
                    <Link to={`/user-profile/${follower.id}`}>
                        {follower.username}
                    </Link>
                </li>
            )
        })
    }

    if (profileData.followings) {
        followingList = profileData.followings.map((following) => {
            return (
                <li key={following.id}>
                    <Link to={`/user-profile/${following.id}`}>
                        {following.username}
                    </Link>
                </li>
            )
        })
        const createdAt = new Date(profileData.user.createdAt)
        formattedDate = createdAt.toLocaleDateString()
    }
    if (profileData.user) {
        username = profileData.user.username
    }






// username = profileData.user.username

            
    return (
        <>
        <h3>{username}</h3>
            <h2>member since: {formattedDate}</h2>
            <ul>{followerList}</ul>
            <ul>
                {postTiles}
            </ul>
        </>
    )

}
export default UserShow