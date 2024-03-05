import express from "express";

import Post from "../../../models/Post.js";
import uploadImage from "../../../services/uploadImage.js";
const mediaRouter = new express.Router()
import PostSerializer from "../../../serializers/PostSerializer.js";

mediaRouter.get("/", async (req, res) => {
    try {
      const posts = await Post.query()
      const postsData = await Promise.all(posts.map(async (post) => {
        const serializedPost = PostSerializer.getPostDetails(post)
        const userData = await PostSerializer.getUserDetails(post)
        serializedPost.owner = userData
        return serializedPost
      }))
      return res.status(200).json({ postsData })
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