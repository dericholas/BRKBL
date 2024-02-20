/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("follows", table => {
        table.bigIncrements("id")
        table.bigInteger("followingUserId").notNullable().index().unsigned().references("users.id")
        table.bigInteger("followedUserId").notNullable().index().unsigned().references("users.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists("follows")
};
