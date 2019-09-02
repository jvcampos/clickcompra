'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table
        .integer('id_category')
        .unsigned()
        .references('id')
        .inTable('categories')
        .notNullable()
      table.string('name_category', 20).notNullable()
      table.string('name_product', 20).notNullable()
      table.text('imageBase64', 'mediumtext').notNullable()
      table.string('description').notNullable()
      table.float('value').notNullable()
      table.integer('amount').notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down() {
    this.drop('products')
  }

  category() {
    return this.hasOne('App/Models/Category')
  }
}

module.exports = ProductSchema
