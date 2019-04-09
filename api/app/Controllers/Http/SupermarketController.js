'use strict'

const Database = use('Database')
const SuperMarketModel = use('App/Models/Supermarket')
const HandlerMessage = use('App/Services/HandlerMessage');

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
}

module.exports = SupermarketController
