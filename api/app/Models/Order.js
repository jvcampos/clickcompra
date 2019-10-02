'use strict'

const Model = use('Model')

class Order extends Model {
  supermarket() {
    return this.belongsTo('App/Models/Supermarket')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Order
