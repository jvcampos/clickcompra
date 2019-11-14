import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001/api/"
});

export function getOrders() {
  return function(dispatch) {
    api
      .get(`allOrders/${JSON.parse(localStorage.id)}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(res => {
        dispatch({
          type: "GET_ORDERS",
          orders: res.data.orders
        });
      });
  };
}

export function acceptOrReject(id, accept) {
  return function(dispatch) {
    api
      .put(
        `allOrders/${id}`,
        { accept },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        dispatch({
          type: "ACCEPT",
          orders: res.data.orders
        });
      });
  };
}
