'use strict'
var _ = require('lodash');
const Database = use('Database')
const OrderModel = use('App/Models/Order')

class FinalizarCompraController {

  async finalizarCompra({ request, response }) {
    const { user_id, id_supermarket, total } = request.all();

    const cartItems = await Database
                .select('id_supermarket', 'qtd', 'product_id', 'value')
                .from('products')
                .innerJoin('carts', 'products.id', 'carts.product_id')
                .where({user_id: user_id, id_supermarket: id_supermarket})

    const supermarket = await Database
                      .select('id_supermarket', 'amount', 'id')
                      .from('products')
                      .where('id_supermarket', id_supermarket)

    const newSupermarket = supermarket.map((item) => {
      return {product_id: item.id, qtd: item.amount, id_supermarket: item.id_supermarket, value: item.value}
    })

    const getAllProductsRelatedWithCart = newSupermarket.filter((supermarket) => {
      if(_.find(cartItems, ['product_id', supermarket.product_id])) return supermarket;
    })

    const result = getAllProductsRelatedWithCart.map(async(item, i) => {
        const product = await Database
        .table('products')
        .where({id: item.product_id, id_supermarket: item.id_supermarket})
        .update({amount: item.qtd - cartItems[i].qtd})
        return product
    })

    const savedOrder = cartItems.map(async (item) => {
      const order = await OrderModel.create({
        supermarket_id: item.id_supermarket,
        user_id: user_id,
        qtde: item.qtd,
        product_id: item.product_id,
        unityValue: item.value,
        status: 2
      })
      return order
    })

    const cartDeleted = await Database
                    .table('carts')
                    .where({user_id: user_id})
                    .delete();

                    console.log(cartDeleted)

    // Promise.all(savedOrder).then((result) => console.log(result))
    // Promise.all(result).then((resp) => console.log(resp))

    return {cartItems, getAllProductsRelatedWithCart}

  }
}

module.exports = FinalizarCompraController

// 'id_supermarket', 'amount', 'id_product'
// if(_.xorBy(newSupermarket, cartItems, 'product_id')) return supermarket
