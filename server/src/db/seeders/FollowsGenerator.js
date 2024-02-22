import { Follow, User } from "../../models/index.js"

class FollowsGenerator {
    static async generate() {  

        const userArray = await User.query()
        const getRandomFollowingCount = (users) => {
            const numOfFollowings = Math.floor(Math.random() * users.length) + 1
            return numOfFollowings
        }

        const getRandomUserId = (users) => {
            const index = Math.floor(Math.random() * users.length)
            return users[index].id
        }

        for (const user of userArray) {
            const followingCount = getRandomFollowingCount(userArray)
            for (let count = 0; count < followingCount; count++) {
                let inserted = false
                while (!inserted) {
                    const followedUserId = getRandomUserId(userArray)
                    let relationExists = await Follow.query().where({followingUserId: user.id, followedUserId: followedUserId}).first()
                    if (!relationExists && followedUserId !== user.id) {
                        await Follow.query().insertAndFetch({followingUserId: user.id, followedUserId: followedUserId})
                        inserted = true
                    }
                }
            }
        }

    }
}

export default FollowsGenerator