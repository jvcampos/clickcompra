'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.string('name', 20).notNullable()
      table
        .integer('id_category')
        .unsigned()
        .references('id')
        .inTable('categories')
        .notNullable()
      table.integer('value').notNullable()
      table.integer('amount').notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }

  category () {
    return this.hasOne('App/Models/Category')
  }
}

module.exports = ProductSchema
