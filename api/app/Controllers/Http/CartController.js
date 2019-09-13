'use strict'
const Cart = use('App/Models/Cart')
const HandlerMessage = use('App/Services/HandlerMessage');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with carts
 */
class CartController {
  async index({ request, response, view }) {
    const carts = Cart.all()

    return carts
  }

  async create({ auth, request, response, view }) {
    const { id } = auth.user
    const data = request.only([
      'product_id',
      'amount',
      'idRandom'
    ])

    const cart = await Cart.create({ ...data, user_id: id })

    return cart
  }

  async update({ params, request, response }) {
    const cart = await Cart.findOrFail(params.product_id)

    const data = request.only([
      'amount',
      'idRandom'
    ])
    cart.merge(data)

    await cart.save()
    return cart
  }

  async delete({ params, response }) {
    try {
      const { user_id } = params
      const cart = await Cart.find(user_id)
      await cart.delete()
      HandlerMessage.handlerDelete(response, cart)
    } catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async getCart({ params, response }) {
    const { user_id } = params
    const cart = await Cart.find(user_id)
    if (cart) {
      HandlerMessage.handlerSuccess(response, cart)
    } else {
      HandlerMessage.handlerNotFound(response);
    }
  }
}

module.exports = CartController
