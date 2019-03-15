'use strict'

const SuperMarketModel = use('App/Models/Supermarket')
const HandlerMessage = use ('App/Services/HandlerMessage');

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
}

module.exports = SupermarketController
