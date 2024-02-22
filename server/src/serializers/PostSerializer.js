
class PostSerializer {
    static getPostDetails(postObject) {
        const allowedAttributes = ["id", "image", "caption", "createdAt"]
        
        let serializedPostObject = {}
        
        for (const attribute of allowedAttributes) {
            serializedPostObject[attribute] = postObject[attribute]
        }
        return serializedPostObject
    }





    
    static async getUserDetails(postObject) {
        const allowedUserAttributes = ["id", "username"]

        const postOwner = await postObject.$relatedQuery("user")
        console.log("postOwner", postOwner)
        let serializedOwnerObject = {}

        for (const attribute of allowedUserAttributes) {
            serializedOwnerObject[attribute] = postOwner[attribute]
        }
        console.log("serializedOwnerObject", serializedOwnerObject)
        return serializedOwnerObject
    }


}

export default PostSerializer