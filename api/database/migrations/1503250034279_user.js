'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('cpf', 15).notNullable().unique()
      table.string('name', 80).notNullable()
      table.string('address',150).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 80).notNullable().unique()
      table.enu('role', ['ADMIN', 'CUSTOMER'])
      table.enu('mobile', ['TRUE', 'FALSE'])
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
