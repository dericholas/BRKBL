/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "username"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username"],

      properties: {
        username: { type: "string" },
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Post, User } = require("./index.js")
    return {
        posts: {
            relation: Model.HasManyRelation,
            modelClass: Post,
            join: {
                from: "users.id",
                to: "posts.userId"
            }
        },
        followings: {
          relation: Model.ManyToManyRelation,
          modelClass: User,
          join: {
            from: "users.id",
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
            from: "users.id",
            through: {
              from: "follows.followedUserId",
              to: "follows.followingUserId"
            },
            to: "users.id"
          }
        }
    }
}

  $beforeInsert() {
    return this.$checkUniqueness("email");
  }

  $beforeUpdate() {
    return this.$checkUniqueness("email");
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
