import { Follow } from "../models/index.js"
class FollowSerializer {
    static async getFollowDetails(userObject, currentUserId) {

        const allowedAttributes = ["id", "username", "createdAt"]
        const serializedFollow = {}

        for (const attribute of allowedAttributes) {
            serializedFollow[attribute] = userObject[attribute]
        }
        const followingRelation = await Follow.query().where({followingUserId: currentUserId, followedUserId: userObject.id})
        const followedRelation = await Follow.query().where({followingUserId: userObject.id, followedUserId: currentUserId})

        serializedFollow.isFollowing = followingRelation.length > 0 ? true : false
        serializedFollow.isFollowed = followedRelation.length > 0 ? true : false

        return serializedFollow
    }
}
export default FollowSerializer