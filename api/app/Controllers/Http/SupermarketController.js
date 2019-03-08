'use strict'

const SuperMarketModel = use('App/Models/Supermarket')

class SupermarketController {
    async create({ request }) {
    // NOTE (outra maneira) const data = request.only("cnpj", "name", "address", "email", "year_foundation")
    const { cnpj, name, address, email, year_foundation } = request.all();
    const supermarket = await SuperMarketModel.create({
        cnpj,
        name,
        address,
        email,
        year_foundation
    })
    return supermarket;
  }
}

module.exports = SupermarketController
