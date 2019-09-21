'use strict'

const Database = use('Database')
const HandlerMessage = use('App/Services/HandlerMessage');

const Cart = use('App/Models/Cart')
class CartController {
  async addOrCreate({ request }) {
    const { product_id, add } = request.all();
    var product = await Cart.findBy('product_id', product_id)
    if(add) {
      if(!product){
        const productAdded = await Cart.create({
          product_id,
          qtd: 1
        })
        console.log(productAdded)
      } else {
        await Database
            .table('carts')
            .where('product_id', product.product_id)
            .update({qtd: product.qtd + 1})
      }
    } else {
        await Database
            .table('carts')
            .where('product_id', product.product_id)
            .update({qtd: product.qtd - 1})
    }
    return product
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
      const supermarkets_aproved = []
      const supermarkets_unproved = []
      const listOfProducts = await Database
      .select('*')
      .from('products')
      .innerJoin('carts', 'products.id', 'carts.product_id')
      .where('user_id', user_id)

      const totalPriceOfAllsupermarkets = listOfProducts.map(product => {
        var productotal = product.qtd * product.value;
        return {id_supermarket: product.id_supermarket, productotal, id_product: product.id, qtd: product.qtd}
      })


      listOfProducts.forEach(product => {
        if(product.qtd > product.amount){
          supermarkets_unproved.push(product.id_supermarket)
        } else {
          supermarkets_aproved.push(product.id_supermarket)
        }
      })


      const listSuper = {aproved: supermarkets_aproved, unproved: supermarkets_unproved}
      const result = listSuper.aproved.filter((data, i) => {
        return data !== listSuper.unproved[i]
      })
      const new_list_super = {aproved: result, unproved: supermarkets_unproved}

      const supermarketsAproved = totalPriceOfAllsupermarkets.filter((supermarket) => {
        return new_list_super.aproved.includes(supermarket.id_supermarket)
      })

      const finalResult = {supermarketsAproved, unproved: new_list_super.unproved}

      return response.status(200).json(finalResult)
    } catch (error) {
      return error
    }
  }

}

module.exports = CartController
