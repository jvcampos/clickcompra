'use strict'

const ProductModel = use('App/Models/Product')

class ProductController {
  async create({ request }){
    const { id_category, name, value, amount } = request.all()
    const product = await ProductModel.create({
      id_category,
      name,
      value,
      amount
    })
    return product
  }
}

module.exports = ProductController
