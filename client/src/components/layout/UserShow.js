import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import UserPostTile from "./UserPostTile";

const UserShow = ({match, currentUser}) => {


    const [profileData, setProfileData] = useState([])
    let userId = match.params.id

    const getUserData = async () => {
        try {
            const fetchedProfileData = await fetch(`/api/v1/user-profile/${userId}`)
            const parsedProfileData = await fetchedProfileData.json()
            setProfileData(parsedProfileData)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUserData()
    }, [userId])

    const handleFollow = async (event) => {
        event.preventDefault()
        try {
            const followResponse = await fetch("/api/v1/user-profile/", {})

        } catch(error) {

        }
    }

    let currentUserIsFollowing = false
    let currentUserIsFollowed = false
    let followerList = []
    let followerCount = 0
    let postTiles = []
    let followingList = []
    let followingCount = 0
    let username = ""
    let formattedDate = ""
    let followButton = (
        <button className="button" >
            Follow
        </button>
    )


    if (Object.keys(profileData).length > 0) {
        const {user, followers, followings, posts} = profileData
        username = user.username

        postTiles = posts.map((post) => {
            return (
                <UserPostTile key={post.id}
                    post={post}
                />
            )
        }) 
    
        currentUserIsFollowing = followers.map((follower) => follower.id).includes(currentUser.id)
        if (currentUserIsFollowing) {
            followButton = (
            <button className="button" >
                Unfollow
            </button>
            )
        } else {
            <button className="button" onClick={handleFollow} >
                Follow
            </button>
        }
        
        followerCount = followers.length
        followerList = followers.map((follower) => {
            return (
                <li key={follower.id}>
                    <Link to={`/user-profile/${follower.id}`}>
                        {follower.username}
                    </Link>
                </li>
            )
        })

        currentUserIsFollowed = followings.map((following) => following.id).includes(currentUser.id)
        followingCount = followings.length
        followingList = followings.map((following) => {
            return (
                <li key={following.id}>
                    <Link to={`/user-profile/${following.id}`}>
                        {following.username}
                    </Link>
                </li>
            )
        })
        const createdAt = new Date(user.createdAt)
        formattedDate = createdAt.toLocaleDateString()
    }

        





            
    return (
        <>
        <h3>{username}</h3>
        {followButton}
            <h2>member since: {formattedDate}</h2>
            <div>
                <h6>Followers: {followerCount}</h6>
                <ul>{followerList}</ul>
            </div>
            <div>
                <h6>Following: {followingCount}</h6>
                <ul>{followingList}</ul>
            </div>
            <ul>
                {postTiles}
            </ul>
        </>
    )

}
export default UserShow