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
            user1: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "follows.followingUserId",
                    to: "users.id"
                }
            },
            user2: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "follows.followedUserId",
                    to: "users.id"
                }
            }
        }
    }
}
module.exports = Follow