'use strict'

const Schema = use('Schema')

class ForgotPasswordSchema extends Schema {
  up () {
    this.create('forgot_passwords', (table) => {
      table.string('token', 200).notNullable()
      table.string('email', 200).notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('forgot_passwords')
  }
}

module.exports = ForgotPasswordSchema
