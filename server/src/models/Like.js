const Model = require("./Model")

class Like extends Model {
    static get tableName() {
        return "likes"
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["commentBody"],
            properties: {
                commentBody: { type: "string" },
            }
        }
    }
    static get relationMappings() {
        const { User } = require("./index")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "likes.userId",
                    to: "users.id"
                }
            }
        }
    }
}
module.exports = Like