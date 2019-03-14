'use strict'

const SuperMarketModel = use('App/Models/Supermarket')

class SupermarketController {
    async create({ request, response }) {
    // NOTE (outra maneira) const data = request.only("cnpj", "name", "address", "email", "year_foundation")
    const { cnpj, name, address, email, year_foundation } = request.all();
    try {
      const supermarket = await SuperMarketModel.create({
        cnpj,
        name,
        address,
        email,
        year_foundation
      })
      return supermarket;
    } catch (error) {
      console.log(error)
      response.status(500).json({
        error: error.code,
        error_message: error.sqlMessage,
        message: "Ops, não consegui cadastrar novo supermercado !"
      })
    }
  }
}

module.exports = SupermarketController
