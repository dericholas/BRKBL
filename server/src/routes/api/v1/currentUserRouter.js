import express from "express";
import { User } from "../../../models/index.js";
const currentUserRouter = new express.Router()


currentUserRouter.get("/:id", async (req, res) => {
    const currentUserId = req.params.id
    console.log(currentUserId)
    try {
        const userProfileData = {}
        const queriedUser = await User.query().findById(currentUserId)
        userProfileData.currentUser = queriedUser
        userProfileData.followers = await queriedUser.$relatedQuery("followers")
        userProfileData.followings = await queriedUser.$relatedQuery("followings")
        userProfileData.posts = await queriedUser.$relatedQuery("posts")
        // serializedData = null
        return res.status(200).json(userProfileData)
    } catch(error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})



  export default currentUserRouter