import express from "express"
import { Follow, User } from "../../../models/index.js"
import { ValidationError } from "objection"

const followRouter = new express.Router()

followRouter.post("/:id", async (req, res) => {
    const currentUserId = req.user.id
    const userToFollowId = req.params.id
    const followToInsert = {followingUserId: currentUserId, followedUserId: userToFollowId}

    try {
        const currentUserExists = await User.findById(currentUserId);
        const userToFollowExists = await User.findById(userToFollowId);
        const followExists = await Follow.query().where(followToInsert)

        if (!currentUserExists || !userToFollowExists) {
            return res.status(404).json({ message: "User not found" });
        } else if (followExists) {
            return res.status(409).json({ message: "Follow already Exists" })
        } else {
        const insertedFollow = await Follow.query().insert(followToInsert)
        return res.status(201).json({followed: insertedFollow})
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error.message })
    }
})

followRouter.delete("/:id", async (req, res) => {
    const currentUserId = req.user.id
    const followedUserId = req.params.id
    const followToDelete = {followingUserId: currentUserId, followedUserId}

    try {
            const followExists = await Follow.query().where(followToDelete)
            if (followExists) {
                const deletedFollow = await Follow.query().delete(followToDelete)
                return res.status(200).json({unfollowed: deletedFollow})
            } else {
                return res.status(404).json({ message: "Follow not found" });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(422).json({ errors: error.data })
            }
            return res.status(500).json({ errors: error.message })
        }
    })

export default followRouter