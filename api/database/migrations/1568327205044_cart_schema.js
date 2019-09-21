'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up() {
    this.create('carts', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('product_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('qtd').notNullable()
      table.integer('idRandom')
      table.timestamps()
    })
  }

  down() {
    this.drop('carts')
  }
}

module.exports = CartSchema
