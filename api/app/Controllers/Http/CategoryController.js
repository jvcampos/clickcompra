'use strict'

const Database = use('Database')
const CategoryModel = use('App/Models/Category')
const HandlerMessage = use('App/Services/HandlerMessage');

class CategoryController {
  async create({ request }) {
    const { id_supermarket, name } = request.all()
    const category = await CategoryModel.create({
      id_supermarket,
      name
    })
    return category
  }
  async update({ request, params, response }) {
    try {
      const { name } = request.all();
      const { id } = params;
      await Database
        .table('categories')
        .where('id', id)
        .update({ name })
      const category = await CategoryModel.find(id)
      HandlerMessage.handlerUpdate(response, category)
    }
    catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async delete({ params, response }) {
    try {
      const { id } = params;
      const category = await CategoryModel.find(id)
      await category.delete();
      HandlerMessage.handlerDelete(response, category)
    } catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async getCategory({ params, response }) {
    const { id } = params;
    const category = await CategoryModel.find(id)
    if (category) {
      HandlerMessage.handlerSuccess(response, category)
    }else{
      HandlerMessage.handlerNotFound(response);
    }
  }

  async getAll({ request }) {
    const { page } = request.all()
    const categories = await Database
      .from('categories')
      .paginate(page, 1)
    return categories
  }
}

module.exports = CategoryController
