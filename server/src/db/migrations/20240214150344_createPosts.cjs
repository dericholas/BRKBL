/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("posts", table => {
        table.bigIncrements("id")
        table.string("caption").notNullable()
        table.string("image").notNullable()
        table.bigInteger("userId").notNullable().index().unsigned().references("users.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists("posts")
};

