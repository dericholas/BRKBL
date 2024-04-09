class PostSerializer {
    static async getPostDetails({postObject, postOwner}) {
        const allowedAttributes = ["id", "image", "caption", "createdAt"]
        const allowedUserAttributes = ["id", "username"]

        let serializedPostObject = {
            owner: {}
        }

        for (const attribute of allowedUserAttributes) {
            serializedPostObject.owner[attribute] = postOwner[attribute]
        }
        for (const attribute of allowedAttributes) {
            serializedPostObject[attribute] = postObject[attribute]
        }
    
        return serializedPostObject
    }

}

export default PostSerializer