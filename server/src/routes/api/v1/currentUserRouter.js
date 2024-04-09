import express from "express";
import { User } from "../../../models/index.js";
import PostSerializer from "../../../serializers/PostSerializer.js";
import FollowSerializer from "../../../serializers/FollowSerializer.js";
const currentUserRouter = new express.Router()


currentUserRouter.get("/:id", async (req, res) => {
    const currentUserId = req.user.id
    console.log("currentUserId:", currentUserId)
    try {
        const userProfileData = {}
        const queriedUser = await User.query().findById(currentUserId)
        userProfileData.currentUser = queriedUser

        const queriedFollowers = await queriedUser.$relatedQuery("followers")
        console.log("queriedFollowers:", queriedFollowers)

        userProfileData.followers = await Promise.all(queriedFollowers.map(async (userObject) => {
            const serializedFollow = await FollowSerializer.getFollowDetails(userObject, currentUserId)
            console.log("serializedFollow", serializedFollow)
            return serializedFollow
        }))
        console.log("userProfileData.followers", userProfileData.followers)
        const queriedFollowings = await queriedUser.$relatedQuery("followings")
        console.log("queriedFollowings", queriedFollowings)

        userProfileData.followings = await Promise.all(queriedFollowings.map(async (userObject) => {
            const serializedFollow = await FollowSerializer.getFollowDetails(userObject, currentUserId)
            return serializedFollow
        }))

        const queriedPosts = await queriedUser.$relatedQuery("posts")
        userProfileData.posts = await Promise.all(queriedPosts.map(async (postObject) => {
            const postOwner = queriedUser
            const serializedPost = await PostSerializer.getPostDetails({postObject, postOwner})
            return serializedPost
        }))
        
        return res.status(200).json(userProfileData)
    } catch(error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})



  export default currentUserRouter

