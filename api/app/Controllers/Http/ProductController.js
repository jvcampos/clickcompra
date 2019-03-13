'use strict'

const ProductModel = use('App/Model/Product')

class ProductController {
  async create({ request }){
    const { id_category, name, value, amount } = request.all()
    try {
      const product = await ProductModel.create({
        id_category,
        name,
        value,
        amount
      })
      return product
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ProductController
