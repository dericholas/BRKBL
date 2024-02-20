const Model = require("./Model")

class Friendship extends Model {
    static get tableName() {
        return "friendships"
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
                    from: "friendships.friend1Id",
                    to: "users.id"
                }
            },
            user2: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "friendships.friend2Id",
                    to: "users.id"
                }
            }
        }
    }
}
module.exports = Friendship