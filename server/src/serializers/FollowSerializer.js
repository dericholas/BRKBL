import { Follow } from "../models/index.js"

class FollowSerializer {
    static async getFollowDetails(followObject, currentUserId) {
        const {followingUserId, followedUserId} = followObject
        const allowedAttributes = ["followingUserId", "followedUserId"]
        const serializedFollow = {}

        for (const attribute of allowedAttributes) {
            serializedFollow[attribute] = followObject[attribute]
        }
        serializedFollow.isFollowing = await Follow.query().where({followingUserId: currentUserId, followedUserId})
        serializedFollow.isFollowed = await Follow.query().where({followingUserId, followedUserId: currentUserId})
        
        return serializedFollow
    }
}
export default FollowSerializer

