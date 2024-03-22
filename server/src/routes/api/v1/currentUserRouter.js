import express from "express";
import { User } from "../../../models/index.js";
import PostSerializer from "../../../serializers/PostSerializer.js";
import FollowSerializer from "../../../serializers/FollowSerializer.js";
const currentUserRouter = new express.Router()


currentUserRouter.get("/:id", async (req, res) => {
    const currentUserId = req.params.id
    console.log("req.user.id:", req.user.id)
    try {
        const userProfileData = {}
        const queriedUser = await User.query().findById(currentUserId)
        userProfileData.currentUser = queriedUser

        // const queriedFollowers = await queriedUser.$relatedQuery("followers")
        // userProfileData.followers = await Promise.all(queriedFollowers.map(async (followObject) => {
        //     const serializedFollow = await FollowSerializer.getFollowDetails(followObject, currentUserId)
        //     console.log(serializedFollow)
        //     return serializedFollow
        // }))
        // const queriedFollowings = await queriedUser.$relatedQuery("followings")
        // userProfileData.followings = await Promise.all(queriedFollowings.map(async (followObject) => {
        //     const serializedFollow = await FollowSerializer.getFollowDetails(followObject, currentUserId)
        //     return serializedFollow
        // }))

        const queriedPosts = await queriedUser.$relatedQuery("posts")
        userProfileData.posts = await Promise.all(queriedPosts.map(async (post) => {
            const serializedPost = await PostSerializer.getPostDetails(post)
            return serializedPost
        }))
        
        return res.status(200).json(userProfileData)
    } catch(error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})



  export default currentUserRouter