'use strict'

const Schema = use('Schema')

class SupermarketSchema extends Schema {
  up () {
    this.create('supermarkets', (table) => {
      table
        .integer('id_manager')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table.string('cnpj', 20).notNullable().unique()
      table.string('name', 80).notNullable().unique()
      table.string('address',150).notNullable()
      table.string('email', 254).notNullable().unique()
      table.date('year_foundation').notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('supermarkets')
  }

  user () {
    return this.hasMany('App/Models/User')
  }
}

module.exports = SupermarketSchema
