'use strict'
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.string('name_categorie', 20).notNullable().unique()
      table.string('description', 20).notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
