'use strict'
const Cart = use('App/Models/Cart')
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
      'amount'
    ])

    const cart = await Cart.create({ ...data, user_id: id })

    return cart
  }

  async update({ params, request, response }) {
    const cart = await Cart.findOrFail(params.id)

    const data = request.only([
      'product_id',
      'amount'
    ])
    cart.merge(data)

    await cart.save()
    return cart
  }

  /**
   * Delete a cart with id.
   * DELETE carts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = CartController
