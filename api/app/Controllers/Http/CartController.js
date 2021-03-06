'use strict'

const Database = use('Database')
const HandlerMessage = use('App/Services/HandlerMessage');
const _ = require('lodash');

const Cart = use('App/Models/Cart')
class CartController {
  async addOrCreate({ request, response }) {
    const { product_id, add, user_id, cart_product_name } = request.all();
    console.log('cart_product_name', cart_product_name)
    var product = await Cart.findBy('product_id', product_id)

    if(add) {
      if(!product){
        const productAdded = await Cart.create({
          product_id,
          user_id,
          cart_product_name,
          qtd: 1
        })
        return response.status(200).json(productAdded)
      } else {
          await Database
            .table('carts')
            .where('product_id', product.product_id)
            .update({qtd: product.qtd + 1, cart_product_name})
            var product = await Cart.findBy('product_id', product_id)
            return product
      }
    } else {
      console.log('aqui dentro do delete')
      console.log(product)
      if(product.qtd > 0){
        await Database
            .table('carts')
            .where('product_id', product.product_id)
            .update({qtd: product.qtd - 1})
            var product = await Cart.findBy('product_id', product_id)
            return product
      }
    }
  }

  async getCart({ params, response }) {
    const { user_id } = params
    const cart = await Database
                  .table('carts')
                  .where('user_id', user_id)
    if (cart) {
      HandlerMessage.handlerSuccess(response, cart)
    } else {
      HandlerMessage.handlerNotFound(response);
    }
  }

  // FINALLY A LIST PRODUCT'S (select best supermarket to choice)
  async getBetterSupermarket({ params, response }){
    const itemOrdered = []
    try {
      const { user_id } = params;
      const listOfProducts = await Database
      .select('*')
      .from('products')
      .innerJoin('carts', 'products.id', 'carts.product_id')
      .where('user_id', user_id)

      const findedAllProducts = listOfProducts.map(product => {
        return {id: product.id, name: product.name_product, id_supermarket: product.id_supermarket, qtde: product.qtd}
      })

      const removeEquals = _.uniqBy(findedAllProducts, 'name');
      
      console.log(removeEquals)

      const allProducts = await Database
      .select('id_supermarket', 'name_product', 'value', 'amount')
      .from('products')

     let arr = [];
      const tt = removeEquals.map(product => {
        allProducts.forEach(p => {
          if(p.name_product === product.name) {
            arr.push({...p, "qtd": product.qtde})
          }
        })
      })
      const marketsOrdered = _.orderBy(arr, 'id_supermarket')
      const sorted = _.sortBy(marketsOrdered, 'id_supermarket')

      function group(arr, key) {
        return [...arr.reduce((acc, o) => 
            acc.set(o[key], (acc.get(o[key]) || []).concat(o))
        , new Map).values()];
    }

      const bb = group(sorted, 'id_supermarket')

      return response.status(200).json(bb)
    } catch (error) {
      return error
    }
  }

}

module.exports = CartController
