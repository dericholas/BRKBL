import express from "express";

import Post from "../../../models/Post.js";
import uploadImage from "../../../services/uploadImage.js";
const mediaRouter = new express.Router()
import PostSerializer from "../../../serializers/PostSerializer.js";

mediaRouter.get("/", async (req, res) => {
    try {
      const posts = await Post.query()
      const postsData = await Promise.all(posts.map(async (postObject) => {
        const postOwner = await postObject.$relatedQuery("user")
        const serializedPost = PostSerializer.getPostDetails({postObject, postOwner})
        return serializedPost
      }))
      console.log("POSTSDATA FROM mediaRouter", postsData)
      return res.status(200).json({ postsData })
    } catch (error) {
      console.error("ERROR", error)
      return res.status(500).json({ errors: error })
    }
})
mediaRouter.post("/", uploadImage.single("image"), async (req, res) => {
    const currentlyLoggedInUser = req.user
    const postToAdd = req.body
    postToAdd.userId = currentlyLoggedInUser.id
    try {
        const dataToInsert = {...postToAdd, image: req.file.location}
        const post = await Post.query().insertAndFetch(dataToInsert)
        return res.status(201).json({ post })
    } catch (error) {
        return res.status(500).json({errors: error})
    }
  })

  export default mediaRouter