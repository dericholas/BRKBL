import express from "express";

import Post from "../../../models/Post.js";
import uploadImage from "../../../services/uploadImage.js";
const mediaRouter = new express.Router()


mediaRouter.get("/", async (req, res) => {
    try {
      const posts = await Post.query()
      console.log("posts from router", posts)
      return res.status(200).json({ posts })
    } catch (error) {
      return res.status(500).json({ errors: error })
    }
})
mediaRouter.post("/", uploadImage.single("image"), async (req, res) => {
    const currentlyLoggedInUser = req.user
    const postToAdd = req.body
    postToAdd.userId = currentlyLoggedInUser.id
    try {
        console.log("postToAdd", postToAdd)
        const dataToInsert = {...postToAdd, image: req.file.location}
        const post = await Post.query().insertAndFetch(dataToInsert)
        return res.status(201).json({ post })
    } catch (error) {
        console.log("ERROR:", error)
        return res.status(500).json({errors: error})
    }
  })

  export default mediaRouter