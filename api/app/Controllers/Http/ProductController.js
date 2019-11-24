"use strict";

const Database = use("Database");
const ProductModel = use("App/Models/Product");
const SupermarketModel = use("App/Models/Supermarket");
const CategoryModel = use("App/Models/Category");
const HandlerMessage = use("App/Services/HandlerMessage");

class ProductController {
  async create({ request }) {
    const {
      id_category,
      id_supermarket,
      name_category,
      name_product,
      imageBase64,
      description,
      value,
      amount,
    } = request.all();
    console.log(id_supermarket);
    console.log(request.all());
    const product = await ProductModel.create({
      id_category,
      id_supermarket,
      name_category,
      name_product,
      imageBase64,
      description,
      value,
      amount,
      upc_code: 1
    });
    return product;
  }

  async update({ request, params, response }) {
    try {
      const {
        id_category,
        name_category,
        name_product,
        imageBase64,
        description,
        value,
        amount
      } = request.all();
      const { id } = params;
      await Database.table("products")
        .where("id", id)
        .update({
          id_category,
          name_category,
          name_product,
          imageBase64,
          description,
          value,
          amount
        });
      const product = await ProductModel.find(id);
      HandlerMessage.handlerUpdate(response, product);
    } catch (error) {
      HandlerMessage.handlerError(response, error);
    }
  }

  async delete({ params, response }) {
    try {
      const { id } = params;
      const product = await ProductModel.find(id);
      await product.delete();
      HandlerMessage.handlerDelete(response, product);
    } catch (error) {
      HandlerMessage.handlerError(response, error);
    }
  }

  async getProduct({ params, response }) {
    const { id_category } = params;
    const product = await Database.select(
      "id",
      "id_category",
      "name_category",
      "name_product",
      "imageBase64",
      "description",
      "value",
      "amount"
    )
      .from("products")
      .where("id_category", id_category);
    if (product) {
      HandlerMessage.handlerSuccess(response, product);
    } else {
      HandlerMessage.handlerNotFound(response);
    }
  }

  async getAll({ params }) {
    const { id } = params;
    const products = await Database.select(
      "id",
      "id_category",
      "name_category",
      "name_product",
      "imageBase64",
      "description",
      "value",
      "amount"
    )
      .from("products")
      .where("id_supermarket", id);
    return products;
  }

  async getAllProducts({ params }) {
    const { id_supermarket } = params;
    const products = await Database.select(
      "id",
      "id_category",
      "name_category",
      "name_product",
      "imageBase64",
      "description",
      "value",
      "amount"
    )
      .from("products")
      .where("id_supermarket", id_supermarket);
    return products;
  }

  async getAllMobile() {
    const products = await Database.select(
      "id",
      "id_category",
      "name_category",
      "name_product",
      "imageBase64",
      "description",
      "value",
      "amount"
    ).from("products");
    return products;
  }

  async betterProducts({ params }) {
    const { id_supermarket } = params;
    const products = await Database.select("name_product", "qtde")
      .from("orders")
      .where({"status" : 1, "supermarket_id" : id_supermarket})
      .orderBy("qtde", "desc")
      .limit(5)

    return products;
  }

  async bestCategory({ params }) {
    const { id_supermarket } = params;
    const products = await Database.select("products.id_category", "products.name_category")
      .from("orders")
      .innerJoin("products", "products.id", "orders.product_id")
      .where({"status" : 1, "supermarket_id" : id_supermarket})
      .orderBy("qtde", "desc")
      .limit(5)

    return products;
  }

}

module.exports = ProductController;
