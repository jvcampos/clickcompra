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









      //   const verifyAmount = (itemProduct) => {
      //     const arraySupermarkets = []
      //     const arrayCart = []
      //     const arrayProducts = []

      //     listOfProducts.map(product => { arrayCart.push(product) })
      //     itemProduct.map(product => { arrayProducts.push(product) })

      //     arrayProducts.map(itemProduct => {
      //       arrayCart.map(itemCart => {
      //         if(itemProduct.id === itemCart.product_id){
      //           if(itemProduct.amount < itemCart.amount){ // Quantidade estoque menor do que o cart.
      //             arraySupermarkets.push({
      //               id_supermarket_unproved: itemProduct.id,
      //             });
      //           } else {
      //             arraySupermarkets.push({
      //               id_supermarket_aproved: itemProduct.id
      //             })
      //           }
      //         }
      //       })
      //     })
      //     return arraySupermarkets
      //   }


      //   const funciona  = getProducts().then((data) => {
      //     const allProducts = JSON.parse(JSON.stringify(data))
      //     const allProductsFiltred = []
      //     allProducts.map(product => {
      //       product.map(itemProduct => {
      //         allProductsFiltred.push(itemProduct)
      //       })
      //     })
      //     const result = verifyAmount(allProductsFiltred)
      //     teste.push(result)
      //     return teste
      //   })

      //   async function process() {
      //     return await funciona();
      // }

      // process().then(activities => {
      //     console.log(activities);
      // });

    } catch (error) {
      return error
    }
  }

}

module.exports = CartController
