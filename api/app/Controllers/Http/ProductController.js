'use strict'

const Database = use('Database')
const ProductModel = use('App/Models/Product')
const SupermarketModel = use('App/Models/Supermarket')
const CategoryModel = use('App/Models/Category')
const HandlerMessage = use('App/Services/HandlerMessage');

class ProductController {
  async create({ request }) {
    const { id_category, name_category, name_product, imageBase64, description, value, amount } = request.all()
    console.log(id_category, name_category, name_product, imageBase64, description, value, amount)
    const product = await ProductModel.create({
      id_category,
      name_category,
      name_product,
      imageBase64,
      description,
      value,
      amount
    })
    return product
  }

  async update({ request, params, response }) {
    try {
      const { name_product, imageBase64, description, value, amount } = request.all();
      const { id } = params;
      await Database
        .table('products')
        .where('id', id)
        .update({ name_product, imageBase64, description, value, amount })
      const product = await ProductModel.find(id)
      HandlerMessage.handlerUpdate(response, product)
    }
    catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async delete({ params, response }) {
    try {
      const { id } = params;
      const product = await ProductModel.find(id)
      await product.delete();
      HandlerMessage.handlerDelete(response, product)
    } catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async getProduct({ params, response }) {
    const { id } = params;
    const product = await ProductModel.find(id)
    if (product) {
      HandlerMessage.handlerSuccess(response, product)
    } else {
      HandlerMessage.handlerNotFound(response);
    }
  }

  async getAll({ params }) {
    const { id } = params
    // const categoriesData = await CategoryModel.findBy('id_supermarket', id)
    const products = await Database
      .table('categories')
      .where('categories.id_supermarket', id)
      .innerJoin('products', 'categories.id', 'products.id_category')
    return products
    // const supermarketData = await SupermarketModel.findBy('id_manager', id)
    // const products = await Database
    //   .select('*')
    //   .from('products')
    //   .where('id_supermarket', supermarketData.id)
    // return products
  }
}

module.exports = ProductController
