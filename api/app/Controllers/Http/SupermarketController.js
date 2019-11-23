'use strict'

var _ = require('lodash');
const Database = use('Database')
const SuperMarketModel = use('App/Models/Supermarket')
const OrderModel = use('App/Models/Order')
const ProductModel = use('App/Models/Product')
const UserModel = use('App/Models/User')
const HandlerMessage = use('App/Services/HandlerMessage');
const Mail = use('Mail')

class SupermarketController {
  async create({ request, response }) {
    const { id_manager, cnpj, social_reason, address_supermarket, email_supermarket, year_foundation } = request.all();
    try {
      const supermarket = await SuperMarketModel.create({
        id_manager,
        cnpj,
        social_reason,
        address_supermarket,
        email_supermarket,
        year_foundation,
        status: 2
      })
      HandlerMessage.handlerSuccess(response, supermarket)
    } catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async update({ request, params, response }) {
    try {
      const { cnpj, social_reason , address_supermarket, email_supermarket, year_foundation } = request.all();
      const { id } = params;
      await Database
        .table('supermarkets')
        .where('id', id)
        .update({ cnpj, social_reason, address_supermarket, email_supermarket, year_foundation })
      const supermarket = await SuperMarketModel.find(id)
      HandlerMessage.handlerUpdate(response, supermarket)
    }
    catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async delete({ params, response }) {
    try {
      const { id } = params;
      const supermarket = await SuperMarketModel.find(id)
      await supermarket.delete();
      HandlerMessage.handlerDelete(response, supermarket)
    } catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async getSupermarket({ params, response }) {
      const { id } = params;
      const supermarket = await SuperMarketModel.find(id)
      if(supermarket) {
        HandlerMessage.handlerSuccess(response, supermarket)
      }
      HandlerMessage.handlerNotFound(response);
  }

  async getSupermarketUnproved({ response }){
    try{
      const data = await Database
      .select(
        'users.name', 'users.address', 'users.email',
        'supermarkets.id', 'supermarkets.social_reason', 'supermarkets.cnpj', 'supermarkets.address_supermarket', 'supermarkets.email_supermarket'
        )
      .from('users')
      .where('supermarkets.status', 2)
      .leftJoin('supermarkets', 'users.id', 'supermarkets.id_manager')
      HandlerMessage.handlerSuccess(response, data)
    } catch(error){
      HandlerMessage.handlerError(response, error)
    }
  }

  async aproveSupermarket({ params, response }){

    try {
      const { id } = params;
      await Database
        .table('supermarkets')
        .where('id', id)
        .update('status', 1)
      const supermarket = await SuperMarketModel.find(id)
      await Mail.raw('<h1>Supermercado Aprovado Sucesso!</h1>', (message) => {
        message.from('adm@clickcompra.com')
        message.to(supermarket.email_supermarket)
      })
      HandlerMessage.handlerUpdate(response, supermarket)
    }
    catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async getAll({ request }) {
    const { page } = request.all()
    const supermarkets = await Database
      .from('supermarkets')
      .paginate(page, 1)
      return supermarkets
  }

  async getAllSupermarketsMobile({response}) {
    const supermarkets = await Database
      .select('id', 'social_reason')
      .from('supermarkets')
      return supermarkets
  }

  async getOrdens({ params }) {
    let orderItem = []
    const { id_supermarket } = params;


    // const listOfProducts = await Database
    // .select('*')
    // .from('products')
    // .innerJoin('carts', 'products.id', 'carts.product_id')
    // .where('user_id', user_id)


    const orders = await Database
    .select('orders.id_compra' , 'orders.name_product', 'orders.user_id',
            'orders.product_id', 'orders.qtde', 'orders.unityValue', 'orders.status',
            'users.cpf', 'users.name', 'users.address','users.email')
    .from('orders')
    .innerJoin('users', 'users.id', 'orders.user_id')
    .where({ 'status' : 2 , 'supermarket_id' : id_supermarket})

    console.log(orders)

     orders.map( async order => {
      await orderItem.push({id_compra: order.id_compra, order : []})

      if(orderItem.some( e => e.id_compra === order.id_compra)){
        orderItem[order.id_compra].order.push(order)
      }
    })

    return orderItem

  }

  async aprovedOrder({ response, params }) {
    const { id_order } = params;

    await Database
    .table('orders')
    .where('id_compra', id_order)
    .update({ status: 1})

    // const order = await OrderModel.find(id_order)
    // HandlerMessage.handlerUpdate(response, order)
  }

  async unprovedOrder({ response, params }) {
    const { id_order } = params;

    await Database
    .table('orders')
    .where('id_compra', id_order)
    .delete()

  }


  async getProducts({ response, params }){
    const { id_compra } = params;


    const idProductsFromOrder = await Database
      .select('user_id', 'product_id', 'qtde')
      .table('orders')
      .where('id_compra', id_compra)

    const products = await Database
      .select('*')
      .table('products')

    const userInfo = await UserModel.find(idProductsFromOrder[0].user_id)
    console.log(userInfo)

      const nameProducts = idProductsFromOrder.map(item => {
        const product = _.find(products, ['id', item.product_id])
        return { name: product.name_product, quantiy: item.qtde }
      })

      return { user: userInfo, nameProducts }

  }

}

module.exports = SupermarketController
