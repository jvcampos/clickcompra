'use strict'
var _ = require('lodash');
const Database = use('Database')
const SuperMarketModel = use('App/Models/Supermarket')
const HandlerMessage = use('App/Services/HandlerMessage');
const CartModel = use('App/Models/Cart')


class FinalizarCompraController {

  async finalizarCompra({ request, response }) {
    const { user_id, id_supermarket, total } = request.all();

    const cartItems = await Database
                .select('id_supermarket', 'qtd', 'product_id')
                .from('products')
                .innerJoin('carts', 'products.id', 'carts.product_id')
                .where({user_id: user_id, id_supermarket: id_supermarket})

    const supermarket = await Database
                      .select('id_supermarket', 'amount', 'id')
                      .from('products')
                      .where('id_supermarket', id_supermarket)

    const newSupermarket = supermarket.map((item) => {
      return {product_id: item.id, qtd: item.amount, id_supermarket: item.id_supermarket}
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

    Promise.all(result).then((resp) => console.log(resp))

    return {cartItems, getAllProductsRelatedWithCart}

  }
}

module.exports = FinalizarCompraController

// 'id_supermarket', 'amount', 'id_product'
// if(_.xorBy(newSupermarket, cartItems, 'product_id')) return supermarket
