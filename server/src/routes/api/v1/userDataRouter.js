import express from "express";

import { User } from "../../../models/index.js";

const userDataRouter = new express.Router()

userDataRouter.get("/:id", async (req, res) => {
    const userId = req.params.id
    console.log("userId", userId)
    try {
        console.log("req.params.id", req.params.id)
        const queriedUser = await User.query().findById(userId)
        console.log("queriedUser", queriedUser)
        const userPostList = await queriedUser.$relatedQuery("posts")
        console.log("userPostList", userPostList)
        return res.status(200).json({ posts: userPostList })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default userDataRouter