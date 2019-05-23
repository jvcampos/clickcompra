// action
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/'
})

export function addProduct(id_category,name_product, imageBase64, description, value, amount) {
  return (dispatch) => {
    return api.post('product', { id_category, name_product, imageBase64, description, value, amount },
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        dispatch(newProduct(response.data))
      })
  }
}

export function getProducts(id_manager){
  return (dispatch) => {
    api.get(`products/${id_manager}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    })
    .then(response => {
      dispatch(getAllProducts(response.data))
    })
  }
}

export function deleteProduct(id){
  return (dispatch) => {
    api.delete(`product/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    })
    .then(response => {
      dispatch(removeProduct(response.data))
    })
  }
}

export const newProduct = (data) => {
  return {
    type: 'ADD_PRODUCT',
    data
  }
}

export const getAllProducts = (data) => {
  return {
    type: 'GET_ALL_PRODUCT',
    data
  }
}

export const removeProduct = (data) => {
  return {
    type: "DELETE_PRODUCT",
    id: data.data.id
  }
}