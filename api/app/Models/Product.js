'use strict'

const Model = use('Model')

class Product extends Model {
  cart() {
    return this.hasOne('App/Models/Cart')
  }
}

module.exports = Product
