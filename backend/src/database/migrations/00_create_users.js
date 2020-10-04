const knex = require('knex');

exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('userId').notNullable();
        table.string('password').notNullable();
        table.string('roles').notNullable();
        table.string('files');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("users")
};