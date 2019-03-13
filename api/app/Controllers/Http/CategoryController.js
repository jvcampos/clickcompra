'use strict'

const CategoryModel = use('App/Models/Category')

class CategoryController {
  async create({ request }){
    const { id_supermarket, name } = request.all()
    const category = await CategoryModel.create({
      id_supermarket,
      name
    })
    return category
  }
}

module.exports = CategoryController
