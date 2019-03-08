'use strict'

const Schema = use('Schema')

class ManagerSchema extends Schema {
  up () {
    this.create('managers', (table) => {
      table
        .integer('id_supermarket')
        .unsigned()
        .references('id')
        .inTable('supermarkets')
        .notNullable()
      table.string('cpf', 11).notNullable().unique()
      table.string('name', 80).notNullable().unique()
      table.string('password', 80).notNullable().unique()
      table.string('address',150).notNullable()
      table.string('email', 254).notNullable().unique()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('managers')
  }

  supermarkets () {
    return this.hasOne('App/Models/Supermarket')
  }
}


// NOTE projects () { return this.hasMany('App/Models/Project') }

module.exports = ManagerSchema
