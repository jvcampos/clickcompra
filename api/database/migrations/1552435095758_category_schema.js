'use strict'
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table
        .integer('id_supermarket')
        .unsigned()
        .references('id')
        .inTable('supermarkets')
        .notNullable()
      table.string('name_categorie', 20).notNullable().unique()
      table.string('description', 20).notNullable().unique()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }

  supermarkets () {
    return this.hasOne('App/Models/Supermarket')
  }
}

module.exports = CategorySchema
