import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                username: "dericholas",
                email: "test1@email.com",
                password: "123"
            },
            {
                username: "mrsnowboarderman",
                email: "test2@email.com",
                password: "123"
            },
            {
                username: "mrssnowboarderman",
                email: "test3@email.com",
                password: "123"
            },
            {
                username: "mrskierman",
                email: "test4@email.com",
                password: "123"
            },
            {
                username: "alriiiightAlberts",
                email: "test5@email.com",
                password: "123"
            },
            {
                username: "DovaKeen",
                email: "test6@email.com",
                password: "123"
            },
            {
                username: "PastryMan",
                email: "test7@email.com",
                password: "123"
            },
            {
                username: "MarlonDaGuardian",
                email: "test8@email.com",
                password: "123"
            },
            {
                username: "cornfrog",
                email: "test9@email.com",
                password: "123"
            },
            {
                username: "fuzzyphantasm",
                email: "test10@email.com",
                password: "123"
            }
        ]
  
        for (const user of usersData) {
            const currentUser = await User.query().findOne({ email: user.email })
            if (!currentUser) {
                await User.query().insert(user)
            }
        }
    }
}

export default UserSeeder