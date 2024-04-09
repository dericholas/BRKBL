import React, { useEffect, useState } from "react";
import OwnedPostTile from "./OwnedPostTile.js"
import FollowerTile from "./FollowerTile.js";
import FollowingTile from "./FollowingTile.js";

const CurrentUserShow = ({user}) => {

    const [profileData, setProfileData] = useState({})
    const [showFollowings, setShowFollowings] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)
    const userId = user.id

    const getUserData = async () => {
        try {
            const fetchedProfileData = await fetch(`/api/v1/current-user`)
            const parsedProfileData = await fetchedProfileData.json()
            setProfileData(parsedProfileData)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        getUserData()
    }, [])


    let postTiles = []
    let followerTiles = []
    let followingTiles = []
    let followerCount = "0"
    let followingCount = "0"
    let username = ""
    let formattedDate = ""



    if (Object.keys(profileData).length > 0) {
        console.log(profileData)
        const {posts, followings, followers, currentUser} = profileData
        username = currentUser.username

        const createdAt = new Date(currentUser.createdAt)
        formattedDate = createdAt.toLocaleDateString()
        
        postTiles = posts.map((post) => {
            return (
                <OwnedPostTile key={post.id} post={post} />
            )
        })
        
        followerTiles = followers.map((follower) => {
            return (
                <FollowerTile key={follower.id}
                id={follower.id}
                username={follower.username}
                isFollowed={follower.isFollowed}
                isFollowing={follower.isFollowing}
                />
            )
        })
        followerCount = `Followers: ${followerTiles.length}`

        followingTiles = followings.map((following) => {
            return (<FollowingTile key={following.id}
                id={following.id}
                username={following.username}
                isFollowed={following.isFollowed}
                isFollowing={following.isFollowing}
                />
                )
            })
        followingCount = `Following: ${followingTiles.length}`
        
    }
    const handleFollowingList = (event) => {
        event.preventDefault()
        setShowFollowings(!showFollowings)
    }
    const handleFollowerList = (event) => {
        event.preventDefault()
        setShowFollowers(!showFollowers)
    }
    



    return (
 
        <div className="user-show">
            <h3>{username}</h3>
            <h4>member since: {formattedDate}</h4>
            <div className="followers-dropdown">
                <h6 onClick={handleFollowerList}>{followerCount}</h6>
                {showFollowers ? (
                    <ul>{followerTiles}</ul>
                ) : 
                    null
                }
            </div>
            <div className="followings-dropdown">
                <h6 onClick={handleFollowingList}>{followingCount}</h6>
                {showFollowings ? (
                    <ul>{followingTiles}</ul>
                ) : 
                    null
                }
            </div>
            <div className="post-list">
                 <ul>
                     {postTiles}
                 </ul>
             </div>
        </div>
    )

}
export default CurrentUserShow