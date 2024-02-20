const Model = require("./Model")

class Post extends Model {
    static get tableName() {
        return "posts"
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["image", "caption"],
            properties: {
                image: { type: "string" },
                caption: { type: "string" }
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
                    from: "posts.userId",
                    to: "users.id"
                }
            }
        }
    }
}
module.exports = Post