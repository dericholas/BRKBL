import React, { useEffect, useState } from "react";
import OwnedPostTile from "./OwnedPostTile.js"
import FollowerTile from "./FollowerTile.js";
import FollowingTile from "./FollowingTile.js";

const CurrentUserShow = ({user}) => {

    const [profileData, setProfileData] = useState({})
    const userId = user.id

    const getUserData = async () => {
        try {
            const fetchedProfileData = await fetch(`/api/v1/current-user/${userId}`)
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
    let followerCount = `Followers: ${followerTiles.length}`
    let followingTiles = []
    let followingCount = `Following: ${followingTiles.length}`
    let username = ""
    let formattedDate = ""
    
    let followerIds = []
    let followingIds = []


    // const followButton = (id) => {
    //     let following = false
    //     if (followingIds.includes(id)) {
    //         following = true
    //     }
    //     return (
    //         <button onClick={() => handleFollow(id, following)}>
    //             {following ? "Unfollow" : "Follow"}
    //         </button>
    //     )
    // }



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
        
        // followerTiles = followers.map((follower) => {
        //     return (
        //         <FollowerTile key={follower.id}
                
        //         />
        //     )
        // })
        // followingTiles = followings.map((following) => {
        //     return (<FollowingTile key={following.id}
                
        //         />
        //     )
        // })




        // followerIds = followers.map((follower) => {
        //     return follower.id
        // })

        // followingIds = followings.map((following) => {
        //     return following.id
        // })

        // followerList = followers.map((follower) => {
        //     return (
        //         <li key={follower.id}>
        //            {follower.username}
        //            {followButton(follower.id)}
        //         </li>
        //     )
        // })

        // followingList = followings.map((following) => {
        //     let mutualFollow = false
        //     if (followerIds.includes(following.id)) {
        //         mutualFollow = true
        //     }
        //     return (
        //         <li key={following.id}>
        //            {following.username}
        //            {mutualFollow ? "Follows You" : null}
        //            {followButton(following.id)}
        //         </li>
        //     )
        // })
        





    }



    return (
 
        <div className="user-show">
            <h3>{username}</h3>
            <h4>member since: {formattedDate}</h4>
            <div className="followers-dropdown">
                <h6>Followers: {followerCount}</h6>
                {/* <ul>{followerTiles}</ul> */}
            </div>
            <div className="followings-dropdown">
                <h6>Following: {followingCount}</h6>
                {/* <ul>{followingTiles}</ul> */}
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