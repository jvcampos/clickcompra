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

export const newProduct = (data) => {
  return {
    type: 'ADD_PRODUCT',
    data
  }
}

