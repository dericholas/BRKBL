import express from "express";

import { User } from "../../../models/index.js";
import PostSerializer from "../../../serializers/PostSerializer.js";
import UserSerializer from "../../../serializers/UserSerializer.js";

const userDataRouter = new express.Router()

userDataRouter.get("/:id", async (req, res) => {
    const userId = req.params.id
    try {
        const userProfileData = {}
        const postOwner = await User.query().findById(userId)
        const queriedPosts = await postOwner.$relatedQuery("posts")
        userProfileData.user = UserSerializer.serializeUser(postOwner)
        userProfileData.posts = await Promise.all(queriedPosts.map(async (postObject) => {
            const serializedPost = PostSerializer.getPostDetails({postObject, postOwner})
            return serializedPost
        }))
        userProfileData.followers = await postOwner.$relatedQuery("followers")
        userProfileData.followings = await postOwner.$relatedQuery("followings")
        return res.status(200).json(userProfileData)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default userDataRouter