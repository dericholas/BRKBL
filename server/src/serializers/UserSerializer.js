class UserSerializer {
    static serializeUser(user) {
        const cleanedUserObject = {}
        const allowedAttributes = ["id", "username", "createdAt"]
        for (const attribute of allowedAttributes) {
            cleanedUserObject[attribute] = user[attribute]
        }
        return cleanedUserObject
    }
}

export default UserSerializer