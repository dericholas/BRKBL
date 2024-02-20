
class PostSerializer {
    static async getBuildDetails(postObject) {
        const allowedAttributes = ["id", "userId", "image", "caption"]
        
        let serializedPostObject = {}
        
        for (const attribute of allowedAttributes) {
            serializedPostObject[attribute] = postObject[attribute]
        }
        

        return serializedPostObject
    }
}

export default PostSerializer