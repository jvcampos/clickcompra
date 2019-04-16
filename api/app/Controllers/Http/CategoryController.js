'use strict'

const Database = use('Database')
const CategoryModel = use('App/Models/Category')
const HandlerMessage = use('App/Services/HandlerMessage');
const UserModel = use('App/Models/User');
const SuperMarketModel = use('App/Models/Supermarket')

class CategoryController {
  async create({ request }) {
    const { id_supermarket, name_categorie, description } = request.all()
    const category = await CategoryModel.create({
      id_supermarket,
      name_categorie,
      description
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

  async getAllSupermarket({ params, response }) {
    const { id } = params;
    const supermarketData = await SuperMarketModel.findBy('id_manager', id)
    const categories = await Database
      .select('id', 'name_categorie', 'description')
      .from('categories')
      .where('id_supermarket', supermarketData.id)
    // const { page } = request.all()
      // .paginate(page, 1)
      return categories
    // HandlerMessage.handlerSuccess(response, categories)
  }
}

module.exports = CategoryController
