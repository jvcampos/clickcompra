"use strict";
const Database = use("Database");

class OrderController {
  async allOrders({ params }) {
    const { user_id } = params;
    const orders = await Database.select(
      "id_compra",
      "product_id",
      "name_product",
      "qtde",
      "created_at",
      "status"
    )
      .from("orders")
      .where("user_id", user_id);
    return orders;
  }
}

module.exports = OrderController;
