/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("friendships", table => {
        table.bigIncrements("id")
        table.bigInteger("friend1Id").notNullable().index().unsigned().references("users.id")
        table.bigInteger("friend2Id").notNullable().index().unsigned().references("users.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
};
/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists("friendships")
};

