const orders = (state = { test: "teste" }, action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return {
        ...state,
        orders: action.orders
      };
    case "ACCEPT":
      return {
        ...state,
        orders: action.orders
      };
    default:
      return state;
  }
};

export default orders