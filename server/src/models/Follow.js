const Model = require("./Model")

class Follow extends Model {
    static get tableName() {
        return "follows"
    }

    // static get jsonSchema() {
    //     return {
    //         type: "object",
    //         required: ["friend1Id", "friend2Id"],
    //         properties: {
    //             friend1Id: {type: "integer"},
    //             friend2Id: {type: "integer"}
    //         }
    //     }
    // }

    static get relationMappings() {
        const { User } = require("./index")
        return {
            followings: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "follows.followingUserId",
                    through: {
                        from: "follows.followingUserId",
                        to: "follows.followedUserId"
                    },
                    to: "users.id"
                }
            },
            followers: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "follows.followedUserId",
                    through: {
                        from: "follows.followedUserId",
                        to: "follows.followingUserId"
                    },
                    to: "users.id"
                }
            }
        }
    }
}
module.exports = Follow