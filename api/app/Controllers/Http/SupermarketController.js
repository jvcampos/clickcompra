'use strict'

const Database = use('Database')
const SuperMarketModel = use('App/Models/Supermarket')
const HandlerMessage = use('App/Services/HandlerMessage');

class SupermarketController {
  async create({ request, response }) {
    const { id_manager, cnpj, name, address, email, year_foundation } = request.all();
    try {
      const supermarket = await SuperMarketModel.create({
        id_manager,
        cnpj,
        name,
        address,
        email,
        year_foundation
      })
      HandlerMessage.handlerSuccess(response, supermarket)
    } catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async update({ request, params, response }) {
    try {
      const { cnpj, name, address, email, year_foundation } = request.all();
      const { id } = params;
      await Database
        .table('supermarkets')
        .where('id', id)
        .update({ cnpj, name, address, email, year_foundation })
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

  async getAll({ request }) {
    const { page } = request.all()
    const supermarkets = await Database
      .from('supermarkets')
      .paginate(page, 1)
      return supermarkets
  }
}

module.exports = SupermarketController
