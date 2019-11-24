'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table
        .integer('supermarket_id')
        .unsigned()
        .references('id')
        .inTable('supermarkets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('id_compra').notNullable()
      table.string('name_product').notNullable()
      table
        .integer('user_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .onDelete('CASCADE')
      table.integer('product_id').notNullable()
      table.integer('qtde').notNullable()
      table.float('unityValue').notNullable()
      table.enu('status', ['APROVED', 'ANALYZING'])
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
