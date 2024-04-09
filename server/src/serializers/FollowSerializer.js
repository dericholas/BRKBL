import { Follow } from "../models/index.js"

class FollowSerializer {
    static async getFollowDetails(userObject, currentUserId) {
        console.log("userObjectFromSerializer", userObject)
        console.log("currentUserId", currentUserId)

        const allowedAttributes = ["id", "username", "createdAt"]
        const serializedFollow = {}

        for (const attribute of allowedAttributes) {
            serializedFollow[attribute] = userObject[attribute]
        }
        const followingRelation = await Follow.query().where({followingUserId: currentUserId, followedUserId: userObject.id})
        const followedRelation = await Follow.query().where({followingUserId: userObject.id, followedUserId: currentUserId})
        console.log("followedRelation", followedRelation)
        console.log("followingRelation", followingRelation)

        serializedFollow.isFollowing = followingRelation.length > 0 ? true : false
        serializedFollow.isFollowed = followedRelation.length > 0 ? true : false
        console.log("ISFOLLOWING", serializedFollow.isFollowing)
        console.log("ISFOLLOWED", serializedFollow.isFollowed)
        // const isFollowing = !!(await Follow.query().where({followingUserId: currentUserId, followedUserId: userObject.id}))

        return serializedFollow
    }
}
export default FollowSerializer

