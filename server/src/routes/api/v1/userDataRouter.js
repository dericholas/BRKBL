import express from "express";

import { User } from "../../../models/index.js";
import PostSerializer from "../../../serializers/PostSerializer.js";

const userDataRouter = new express.Router()

userDataRouter.get("/:id", async (req, res) => {
    const userId = req.params.id
    try {
        const userProfileData = {}
        const queriedUser = await User.query().findById(userId)
        userProfileData.user = queriedUser
        console.log("queriedUser", queriedUser)
         const queriedPosts = await queriedUser.$relatedQuery("posts")
        userProfileData.posts = await Promise.all(queriedPosts.map(async (post) => {
            const serializedPost = PostSerializer.getPostDetails(post)
            const userData = await PostSerializer.getUserDetails(post)
            serializedPost.owner = userData
            console.log("userData", userData)
            return serializedPost
        }))
        userProfileData.followers = await queriedUser.$relatedQuery("followers")
        userProfileData.followings = await queriedUser.$relatedQuery("followings")
        console.log("userProfileData", userProfileData)
        return res.status(200).json(userProfileData)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default userDataRouter