'use strict'

const Database = use('Database')
const HandlerMessage = use('App/Services/HandlerMessage');

const Cart = use('App/Models/Cart')
const SuperMarketModel = use('App/Models/Supermarket')
const ProductModel = use('App/Models/Product')


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

  // FINALLY A LIST PRODUCT'S (select best supermarket to choice)
  async getBetterSupermarket({ params, response }){
    try {
      const { user_id } = params;
      const supermarkets = []
      const listOfProducts = await Database
        .select('id', 'user_id', 'product_id', 'amount')
        .from('carts')
        .where('user_id', user_id)

        const getProducts = async () => {
          return await Promise.all(listOfProducts.map(product => Database.select('*').from('products').where('id', product.product_id)))
        }

        const verifyAmount = (itemProduct) => {
          const arraySupermarkets = []
          const arrayCart = []
          const arrayProducts = []

          listOfProducts.map(product => { arrayCart.push(product) })
          itemProduct.map(product => { arrayProducts.push(product) })

          arrayProducts.map(itemProduct => {
            arrayCart.map(itemCart => {
              if(itemProduct.id === itemCart.product_id){
                if(itemProduct.amount < itemCart.amount){ // Quantidade estoque menor do que o cart.
                  arraySupermarkets.push({
                    id_supermarket_unproved: itemProduct.id,
                  });
                } else {
                  arraySupermarkets.push({
                    id_supermarket_aproved: itemProduct.id
                  })
                }
              }
            })
          })
          return arraySupermarkets
        }


        getProducts(response).then((data) => {
          const allProducts = JSON.parse(JSON.stringify(data))
          const allProductsFiltred = []
          allProducts.map(product => {
            product.map(itemProduct => {
              allProductsFiltred.push(itemProduct)
            })
          })
          const result = verifyAmount(allProductsFiltred)
          supermarkets.push(result)
          console.log('DENTRO: ', supermarkets)
        })

        if(!supermarkets){
          console.log('FORA: ', supermarkets)
        }


    } catch (error) {
      return error
    }
  }

  async returnIds({ request, params, response }) {
    console.log('chamei')
  }
}

module.exports = CartController
